package com.behrouz.dashboardpanel.controller;


import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.option.TicketImportanceOption;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.ListResponse;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import com.behrouz.dashboardpanel.rest.request.SaveTicketMessageRestRequest;
import com.behrouz.dashboardpanel.rest.request.SaveTicketRestRequest;
import com.behrouz.dashboardpanel.rest.request.TicketListRestRequest;
import com.behrouz.dashboardpanel.rest.request.TicketMessageRequest;
import com.behrouz.dashboardpanel.rest.response.DataTableResponse;
import com.behrouz.dashboardpanel.rest.response.TicketDetailRestResponse;
import com.behrouz.dashboardpanel.rest.response.TicketMessageRestResponse;
import com.behrouz.dashboardpanel.util.ArraysUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping(value = "/admin/ticket")
public class TicketController {



    @RequestMapping(value = {"/", ""})
    public String index(Model model, HttpServletRequest request) {
        model.addAttribute("view", "view/ticket/ticket.html");
        return "index.html";
    }


    //   -----------------------    TICKET PAGE  ------------------------


    @RequestMapping(value = {"/list"})
    public ResponseEntity getUserList(Model model, HttpServletRequest request,
                                      @RequestParam(name = "pagination[page]") int page,
                                      @RequestParam(name = "pagination[perpage]") int perpage,
                                      @RequestParam(name = "sort[sort]", required = false) String sort,
                                      @RequestParam(name = "sort[field]", required = false) String field,
                                      @RequestParam(required = false, name = "project", defaultValue = "0") int project,
                                      @RequestParam(required = false, name = "ticketImportance", defaultValue = "0") long ticketImportance,
                                      @RequestParam(required = false, name = "search") String search,
                                      @RequestParam(required = false, name = "responseType", defaultValue = "0") long responseType,
                                      @RequestParam(required = false, name = "closed", defaultValue = "0") long closed,
                                      @RequestParam(required = false, name = "lastMsgDate", defaultValue = "0") long lastMsgDate,
                                      @RequestParam(required = false, name = "lastMsgToDate", defaultValue = "0") long lastMsgToDate
                                      ) {

        page = 1;
        perpage = 100_00;

        ApiResponseBody<ListResponse<TicketDetailRestResponse>> tickets = OkHttpHelper.getUserTicket(
             new TicketListRestRequest(
                     page,
                     perpage,
                     project,
                     ticketImportance,
                     search,
                     sort,
                     field,
                     responseType,
                     lastMsgDate,
                     lastMsgToDate,
                     closed
             )
        );

        if (tickets.successful() && tickets.getData() != null && !ArraysUtil.isNullOrEmpty(tickets.getData().getData()))
            return ResponseEntity.ok(new DataTableResponse(tickets.getData().getData(), page, perpage, tickets.getData().getCount()));


        return ResponseEntity.ok(new DataTableResponse<>());
    }


//    @RequestMapping(value = {"/list/download"})
//    public ResponseEntity getListExcel(
//            Model model,
//            @RequestParam(required = false, name = "project", defaultValue = "0") int project,
//            @RequestParam(required = false, name = "ticketImportance", defaultValue = "0") long ticketImportance,
//            @RequestParam(required = false, name = "search") String search,
//            @RequestParam(required = false, name = "responseType", defaultValue = "0") long responseType,
//            @RequestParam(required = false, name = "closed", defaultValue = "0") long closed,
////                                      @RequestParam(required = false, name = "submitDate", defaultValue = "0") long submitDate,
////                                      @RequestParam(required = false, name = "submitToDate", defaultValue = "0") long submitToDate,
//            @RequestParam(required = false, name = "lastMsgDate", defaultValue = "0") long lastMsgDate,
//            @RequestParam(required = false, name = "lastMsgToDate", defaultValue = "0") long lastMsgToDate,
//            HttpServletRequest request
//    ) {
//
//
//        byte[] excelData =
//                ticketComponent.createTicketListExcel(
//                        project,
//                        ticketImportance,
//                        search,
//                        responseType,
//                        closed,
//                        lastMsgDate,
//                        lastMsgToDate
//                );
//
//
//        try (FileOutputStream outputStream = new FileOutputStream("ticketList_" +new Date().getTime()+ ".xlsx")) {
//            outputStream.write(excelData);
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.parseMediaType("application/xlsx"));
//
//        String filename = "ticketList_" +new Date().getTime()+ ".xlsx" ;
//        headers.setContentDispositionFormData(filename, filename);
//        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
//        return new ResponseEntity<>(excelData, headers, HttpStatus.OK);
//
//    }

    @RequestMapping(value = {"/modal/add"})
    public ModelAndView addTicketModal(Model model, HttpServletRequest request,
                                       @RequestParam(name = "search", defaultValue = "", required = false) String search) {
        ModelAndView modelAndView = new ModelAndView();
        model.addAttribute("userProject", TicketImportanceOption.getAll());
        modelAndView.setViewName("fragment/modal/addTicketModal.html::modal");
        return modelAndView;
    }


    @RequestMapping(value = {"/save"})
    public ResponseEntity saveTicket(Model model, HttpServletRequest request,
                                     @ModelAttribute SaveTicketRestRequest rest) {
        try {
            ApiResponseBody<String> response =
                    OkHttpHelper.saveOrEditTicket(rest);
            if (!response.successful())
                return new ResponseEntity(new AjaxResponse(false, response.getDescription()), HttpStatus.OK);

            return new ResponseEntity(new AjaxResponse(true, response.getData()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new AjaxResponse(false, e.getMessage()), HttpStatus.OK);
        }
    }


    @RequestMapping(value = {"/close/{id}"})
    public ResponseEntity closeTicket(Model model, HttpServletRequest request,
                                      @PathVariable(required = true, name = "id") int id) {
        try {
            ApiResponseBody<Void> res =
                    OkHttpHelper.closeTicket(new IdRequest(id));
            if (!res.successful())
                return new ResponseEntity(new AjaxResponse(false, res.getDescription()), HttpStatus.OK);
            return new ResponseEntity(new AjaxResponse(true, ""), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity(new AjaxResponse(false, e.getMessage()), HttpStatus.OK);
        }
    }


    @RequestMapping(value = {"/importance/list"})
    public ResponseEntity getTicketImportanceList(Model model, HttpServletRequest request,
                                                  @RequestParam(name = "search", defaultValue = "", required = false) String search
    ) {
        try {

            List<TicketImportanceOption> data =
                    TicketImportanceOption.getAll();
            return new ResponseEntity(new AjaxResponse(true, data), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new AjaxResponse(false, ""), HttpStatus.OK);
        }
    }


    //   -----------------------    TICKET MESSAGE PAGE  ------------------------

    @RequestMapping(value = {"/{trackingCode}"})
    public String getTicketMessagesPage(Model model, HttpServletRequest request,
                                        @PathVariable(required = true, name = "trackingCode") String trackingCode,
                                        SaveTicketMessageRestRequest restRequest) {

        ModelAndView modelAndView = new ModelAndView();
        ApiResponseBody<TicketDetailRestResponse> ticketDetail =
                OkHttpHelper.getUserTicketDetail(trackingCode);

        if (ticketDetail == null || !ticketDetail.successful() || ticketDetail.getData() == null)
            return "";

        model.addAttribute("data", ticketDetail.getData());
        model.addAttribute("isAdmin", true);
        model.addAttribute("closed", ticketDetail.getData().isClosed());
        model.addAttribute("haveAccess", true);
        model.addAttribute("view", "view/ticket/ticketMessage.html");
        return "index.html";
    }

    @RequestMapping(value = {"/message/{ticketId}"})
    public ModelAndView getMessages(Model model, HttpServletRequest request,
                                    @PathVariable(required = true, name = "ticketId") long id) {
        ModelAndView modelAndView = new ModelAndView();
        TicketMessageRequest requestTicket = new TicketMessageRequest(id, false);
        ApiResponseBody<List<TicketMessageRestResponse>> msg = OkHttpHelper.getTicketMessages(requestTicket);
        if (msg.successful() )
            model.addAttribute("msg", msg.getData());
        modelAndView.setViewName("fragment/messages.html::text");
        return modelAndView;
    }


    @RequestMapping(value = {"/last/message/{id}"})
    public ModelAndView getLastMassage(Model model, HttpServletRequest request,
                                       @PathVariable(required = true, name = "id") long id) {
        ModelAndView modelAndView = new ModelAndView();

        TicketMessageRequest requestTicket =
                new TicketMessageRequest(id, true);

        ApiResponseBody<List<TicketMessageRestResponse>> msg =
                OkHttpHelper.getTicketMessages(requestTicket);

        if (msg.successful() )
            model.addAttribute("msg", msg.getData());

        modelAndView.setViewName("fragment/messages.html::text");
        return modelAndView;
    }


    @RequestMapping(value = {"/modal/add/message/"})
    public ModelAndView addTicketMessageModal(Model model, HttpServletRequest request) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("fragment/modal/addTicketMessageModal.html::modal");
        return modelAndView;
    }

    @RequestMapping(value = {"/save/message"})
    public ResponseEntity saveTicketMessage(Model model, HttpServletRequest request,
                                            @ModelAttribute SaveTicketMessageRestRequest restRequest) {

        try {
            ApiResponseBody<Void> res =
                    OkHttpHelper.addNewTicketMessage(restRequest);

            if (!res.successful())
                return new ResponseEntity(new AjaxResponse(false, res.getMessage()), HttpStatus.OK);

            return new ResponseEntity(new AjaxResponse(true, ""), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(new AjaxResponse(false, e.getMessage()), HttpStatus.OK);
        }

    }
}