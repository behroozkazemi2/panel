package com.behrouz.dashboardpanel.component.model;

/**
 * Created by Hapi
 * 31 October 2019 12:08
 **/
public class MenuStructure {



    private String title;
    private String action;
    private float order;
    private boolean active;
    private String icon;

    private boolean accessSuperVisor;


    public MenuStructure() {
    }

    public MenuStructure(String title, String action, float order, boolean active , String icon) {
        this.title = title;
        this.action = action;
        this.order = order;
        this.active = active;
        this.icon = icon;
        this.accessSuperVisor = false;
    }

    public MenuStructure(String title, String action, float order, boolean active , String icon, boolean accessSuperVisor) {
        this.title = title;
        this.action = action;
        this.order = order;
        this.active = active;
        this.icon = icon;
        this.accessSuperVisor = accessSuperVisor;
    }



    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }



    public String getAction() {
        return action;
    }
    public void setAction(String action) {
        this.action = action;
    }



    public float getOrder() {
        return order;
    }
    public void setOrder(float order) {
        this.order = order;
    }



    public boolean isActive() {
        return active;
    }
    public void setActive(boolean active) {
        this.active = active;
    }



    public String getIcon() {
        return icon;
    }
    public void setIcon(String icon) {
        this.icon = icon;
    }


    public boolean isAccessSuperVisor() {
        return accessSuperVisor;
    }
    public void setAccessSuperVisor(boolean accessSuperVisor) {
        this.accessSuperVisor = accessSuperVisor;
    }
}
