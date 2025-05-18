package com.behrouz.dashboardpanel.okhttp.model.response;

import java.util.Collections;
import java.util.List;

public class TagResponse extends IdName {

    private List<IdName> tags;


    public TagResponse() {
    }

    public TagResponse(int id, String name, List<IdName> tags) {
        super(id, name);
        this.tags = tags;
    }

    public TagResponse(int id, String name, IdName tag) {
        super(id, name);
        this.tags = Collections.singletonList(tag);
    }



    public List<IdName> getTags() {
        return tags;
    }
    public void setTags(List<IdName> tags) {
        this.tags = tags;
    }
}
