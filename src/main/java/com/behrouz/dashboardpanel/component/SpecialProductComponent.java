package com.behrouz.dashboardpanel.component;

import com.behrouz.dashboardpanel.exception.KrecException;
import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.rest.request.SpecialProductOfferRequest;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import org.springframework.stereotype.Component;

@Component
public class SpecialProductComponent {

    public void saveSpecialProduct(SpecialProductOfferRequest request) throws KrecException {


        ApiResponseBody<Void> response
                = OkHttpHelper.specialAddSuggestion(request);

        if (!response.successful()) {
            throw new KrecException(response.getDescription());
        }


    }
}
