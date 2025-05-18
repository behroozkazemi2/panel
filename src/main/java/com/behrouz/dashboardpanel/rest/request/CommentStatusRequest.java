package com.behrouz.dashboardpanel.rest.request;

/**
 * Created by: HapiKZM
 * Project Name: behta-server
 * 15 September 2020
 **/
public class CommentStatusRequest {

    private long commentId;
    private long statusId;
    private String editedText;

    public CommentStatusRequest() {
    }

    public CommentStatusRequest(long commentId, long statusId) {
        this.commentId = commentId;
        this.statusId = statusId;
    }

    public CommentStatusRequest(long commentId, long statusId, String editedText) {
        this.commentId = commentId;
        this.statusId = statusId;
        this.editedText = editedText;
    }

    public long getCommentId() {
        return commentId;
    }
    public void setCommentId(long commentId) {
        this.commentId = commentId;
    }

    public long getStatusId() {
        return statusId;
    }
    public void setStatusId(long statusId) {
        this.statusId = statusId;
    }

    public String getEditedText() {
        return editedText;
    }
    public void setEditedText(String editedText) {
        this.editedText = editedText;
    }
}
