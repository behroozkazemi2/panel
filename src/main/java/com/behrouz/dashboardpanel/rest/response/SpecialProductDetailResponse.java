package com.behrouz.dashboardpanel.rest.response;



import com.behrouz.dashboardpanel.okhttp.model.response.SpecialOrderDigestResponse;

import java.util.List;

public class SpecialProductDetailResponse extends SpecialOrderDigestResponse {

    private List<Integer> images;

    private String customerDescription;

    List<SpecialProductSuggestionResponse> suggestionResponse;


    public SpecialProductDetailResponse() {
    }

    public SpecialProductDetailResponse(List<Integer> images, String customerDescription, List<SpecialProductSuggestionResponse> suggestionResponse) {
        this.images = images;
        this.customerDescription = customerDescription;
        this.suggestionResponse = suggestionResponse;
    }

    public List<Integer> getImages() {
        return images;
    }
    public void setImages(List<Integer> images) {
        this.images = images;
    }



    public String getCustomerDescription() {
        return customerDescription;
    }
    public void setCustomerDescription(String customerDescription) {
        this.customerDescription = customerDescription;
    }



    public List<SpecialProductSuggestionResponse> getSuggestionResponse() {
        return suggestionResponse;
    }
    public void setSuggestionResponse(List<SpecialProductSuggestionResponse> suggestionResponse) {
        this.suggestionResponse = suggestionResponse;
    }
}
