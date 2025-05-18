package com.behrouz.dashboardpanel.component;

import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.option.CommentStatusOption;
import com.behrouz.dashboardpanel.option.TicketImportanceOption;
import com.behrouz.dashboardpanel.option.YearTypeOption;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.ProviderSearchRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.ListResponse;
import com.behrouz.dashboardpanel.okhttp.model.response.ProductDigestResponse;

import com.behrouz.dashboardpanel.util.date.PersianDateUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class SelectOptionComponent {


    @Bean(name = "userProject")
    public userProject userProject() {
        return this::getUserProject;
    }
    public interface userProject {
        List<TicketImportanceOption> getUserProject();
    }
    private List<TicketImportanceOption> getUserProject() {

        List<TicketImportanceOption> options = TicketImportanceOption.getAll();


        return options;
    }


    @Bean(name = "importance")
    protected importance importance() {
        return this::getImportance;
    }
    public interface importance {
        List<TicketImportanceOption> getOption();
    }
    private List<TicketImportanceOption> getImportance() {
        return TicketImportanceOption.getAll();

    }

    @Bean(name = "commentStatusList")
    protected commentStatus commentStatus() {
        return this::getCommentStatus;
    }
    public interface commentStatus {
        List<CommentStatusOption> getCommentStatusList();
    }
    private List<CommentStatusOption> getCommentStatus() {
        return CommentStatusOption.getAll();

    }


    @Bean(name = "productList")
    protected product product() {
        return this::getProductListItem;
    }
    public interface product {
        List<ProductDigestResponse> getProductListItems();
    }
    private List<ProductDigestResponse> getProductListItem() {
        ProviderSearchRequest request = new ProviderSearchRequest(
                0,
                10000,
                "",
                0
        );
        ApiResponseBody<ListResponse<ProductDigestResponse>> response =
                OkHttpHelper.productList(request);

        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return response.getData().getData();
    }


    @Bean(name = "YearTypeOption")
    public YearTypeOptions YearTypeOptions() {
        return this::getYearTypeOptions;
    }
    public interface YearTypeOptions {
        List<IdName> YearTypeOptions();
    }
    private List<IdName> getYearTypeOptions() {
        return YearTypeOption.getAll();
    }




    @Bean(name = "allMonth")
    public allMonth allMonth() {
        return this::getAllMonth;
    }
    public interface allMonth {
        List<IdName> getAllMonth();
    }
    private List<IdName> getAllMonth() {
        return PersianDateUtil.getAllMonth();
    }


}
