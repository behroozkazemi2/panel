package com.behrouz.dashboardpanel.component;

import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.model.request.*;
import com.behrouz.dashboardpanel.util.StringUtil;
import com.behrouz.dashboardpanel.exception.KrecException;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.*;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.ProviderResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class ProviderProductComponent {

    public void saveProvider(ProviderRequest request, MultipartFile avatarFile) throws KrecException {


        //todo
        if (StringUtil.isNullOrEmpty(request.getLocationString())){
            throw new KrecException("منطقه تحت پوش نامعتبر");

        }
        if (StringUtil.isNullOrEmpty(request.getName()) ||
                StringUtil.isNullOrEmpty(request.getAddress()) ||
                StringUtil.isNullOrEmpty(request.getFullDescription()) ||
                StringUtil.isNullOrEmpty(request.getInstagramId()) ||
                StringUtil.isNullOrEmpty(request.getPhone()) ||
                StringUtil.isNullOrEmpty(request.getShortDescription()) ||
                StringUtil.isNullOrEmpty(request.getTelegramId())
//                request.getMinDay() == 0
        ) {
            throw new KrecException("اطلاعات وارد شده کامل نمی باشد");

        }

        if(request.getLogoId() == 0 && avatarFile == null){
            throw new KrecException("لطفا تصویر را مجددا بارگذاری کنید.");
        }

        ApiResponseBody<IdName> imageRequest = null;

        if (avatarFile != null) {
            try {
                imageRequest = OkHttpHelper.imageUpload(new ImageRequest(avatarFile.getBytes()));
                if (imageRequest != null && imageRequest.successful()) {
                    request.setLogoId((int) imageRequest.getData().getId());

                }else {
                    throw new KrecException("خطا در اپلود عکس");
                }

            } catch (IOException e) {
                e.printStackTrace();
                throw new KrecException(" خطا در اپلود عکس");
            }
        }


        ApiResponseBody<ProviderResponse> response
                = OkHttpHelper.providerAdd(request);

        if (!response.successful()) {
            throw new KrecException(response.getDescription());
        }

    }

    public long saveProduct(ProductRestRequest request) throws KrecException {


        //todo
        if (StringUtil.isNullOrEmpty(request.getName()) ||
//                StringUtil.isNullOrEmpty(request.getFullDescription()) ||
                StringUtil.isNullOrEmpty(request.getShortDescription())

        ) {
            throw new KrecException("اطلاعات وارد شده کامل نمی باشد");

        }

        if (request.getCategoryId() == 0) {
            throw new KrecException("لطفا دسته بندی را مشخص کنید");

        }
        if (request.getTagsId() == null) {
            throw new KrecException("لطفا تگ را مشخص کنید");
        }

        ApiResponseBody<IdName> response
                = OkHttpHelper.productAddOrEdit(request);

        if (!response.successful()) {
            throw new KrecException(response.getDescription());
        }

        return response.getData().getId();
    }
    public void saveProductProvider(ProviderProductRestRequest request) throws KrecException {


        if ( request.getPrimitiveAmount() == 0  ){
            throw new KrecException("قیمت را به درستی وارد نمایید.");

        }

        if ( request.getStorageCount() == 0  ){
            throw new KrecException("تعداد کالا را به درستی وارد نمایید.");

        }
        if (request.getMaxAllow() == 0){
            throw new KrecException("حدکثر مقدار مجاز را به درستی وارد نمایید.");

        }
             if (request.getPrepareHour() == 0){
            throw new KrecException("زمان ارسال را به درستی وارد نمایید.");

        }

        if (request.getProviderId() == 0) {
            throw new KrecException("لطفا تامین کننده را مشخص کنید");

        }
        if (request.getProductId() == 0) {
            throw new KrecException("لطفا محصول را مشخص کنید");
        }

        ApiResponseBody<IdName> response
                = OkHttpHelper.productProviderAddOrEdit(request);

        if (!response.successful()) {
            throw new KrecException(response.getDescription());
        }

    }
    public void savePromoteProduct(PromoteSaveRequest request) throws KrecException {


        if ( StringUtil.isNullOrEmpty(request.getName())  ){
            throw new KrecException("لطفا عنوان رویداد به درستی وارد نمایید.");

        }
        if (request.getStartDate() == null || request.getEndDate() == null ){
            throw new KrecException("لطفا تاریخ را به درستی وارد کنید.");
        }

        if (request.getProductProviderIds().size() == 0){
            throw new KrecException("حداقل یک محصول برای ثبت رویداد باید انتخاب نمایید.");

        }
        ApiResponseBody<IdName> response
                = OkHttpHelper.promoteProductAddOrEdit(request);

        if (!response.successful()) {
            throw new KrecException(response.getDescription());
        }

    }


    public void saveProductInfoCategory(ProductInfoCategoryRestRequest request) throws KrecException {

        if (request.getInformationCategoryId() == 0 )
            throw new KrecException("اطلاعات وارد شده کامل نمی باشد");

        if (request.getProductId() == 0)
            throw new KrecException("اطلاعات وارد شده کامل نمی باشد");

        if (StringUtil.isNullOrEmpty(request.getName())) {
            throw new KrecException("اطلاعات وارد شده کامل نمی باشد، عنوان را وارد نمایید.");
        }

        if (StringUtil.isNullOrEmpty(request.getValue()) ) {
            throw new KrecException("لطفا مقدار را وارد نمایید");
        }

        ApiResponseBody<Void> response =
                OkHttpHelper.saveProductInfoCategory(request);

        if (!response.successful()) {
            throw new KrecException(response.getDescription());
        }

    }
    public void deleteProductInfoCategory(IdRequest request) throws KrecException {

        ApiResponseBody<Void> response =
                OkHttpHelper.deleteProductInfoCategory(request);

        if (!response.successful()) {
            throw new KrecException(response.getDescription());
        }
    }
}
