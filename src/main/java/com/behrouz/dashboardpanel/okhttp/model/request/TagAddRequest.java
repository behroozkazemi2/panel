package com.behrouz.dashboardpanel.okhttp.model.request;

public class TagAddRequest {

    protected int id;

    protected String name;

//    protected List<Integer> categories;


    public TagAddRequest() {
    }

//    public TagAddRequest(int id, String name, List<Integer> categories) {
//        this.id = id;
//        this.name = name;
//        this.categories = categories;
//    }
//
//
//    public TagAddRequest(int id, String name, int category) {
//        this.id = id;
//        this.name = name;
//        this.categories = Collections.singletonList(category);
//    }


    public TagAddRequest(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }





    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }





//    public List<Integer> getCategories() {
//        return categories;
//    }
//    public void setCategories(List<Integer> categories) {
//        this.categories = categories;
//    }
}
