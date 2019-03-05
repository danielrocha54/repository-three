package sale.model;

import java.util.Date;

public class AppResponse {
	
	private int httpStatus;
	private String errorMessage;
	private Object data;
	private Date timestamp;
	
	public AppResponse() { }
	
	public AppResponse(int httpStatus, String errorMessage, Object data) {
		this.httpStatus = httpStatus;
		this.errorMessage = errorMessage;
		this.data = data;
		this.timestamp = new Date();
	}
	
	public int getHTTPStatus() {
		return this.httpStatus;
	}
	public void setHTTPStatus(int httpStatus) {
		this.httpStatus = httpStatus;
	}
	
	public String getErrorMessage() {
		return this.errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
	public Object getData() {
		return this.data;
	}
	public void setData(Object data) {
		this.data = data;
	}

	public Date getDate() {
		return this.timestamp;
	}
	public void setDate() {
		this.timestamp = new Date();
	}
}
