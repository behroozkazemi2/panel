package com.behrouz.dashboardpanel.rest.response;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Created By Hapi Jalambadani
 */

public class RequestDetailResponse implements Serializable {

    private Long id;


    private String name;
    private long imageId;
    private String description;

    public RequestDetailResponse() {
    }

    public RequestDetailResponse(Object o){
        Method[] methods = o.getClass().getDeclaredMethods();
        for(Method m : methods){
            if(m.getName().startsWith("get")){
                if(m.getReturnType() == long.class){
                    try {
                        this.id = (long) m.invoke(o);
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    } catch (InvocationTargetException e) {
                        e.printStackTrace();
                    }
                }else if(m.getReturnType() == String.class) {
                    try {
                        this.name = (String) m.invoke(o);
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    } catch (InvocationTargetException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }


    public RequestDetailResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    public RequestDetailResponse(Long id) {
        this.id = id;
    }


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }


    public long getImageId() {
        return imageId;
    }
    public void setImageId(long imageId) {
        this.imageId = imageId;
    }


    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
