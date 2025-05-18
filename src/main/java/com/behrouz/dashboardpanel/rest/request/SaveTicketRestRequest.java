package com.behrouz.dashboardpanel.rest.request;

import java.util.List;

public class SaveTicketRestRequest {

    private long project;
    private String subject;
    private String text;
    private long importance;
    private List<Long> documents;

    public long getProject() {
        return project;
    }
    public void setProject(long project) {
        this.project = project;
    }


    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }


    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }


    public long getImportance() {
        return importance;
    }
    public void setImportance(long importance) {
        this.importance = importance;
    }


    public List<Long> getDocuments() {
        return documents;
    }
    public void setDocuments(List<Long> documents) {
        this.documents = documents;
    }
}
