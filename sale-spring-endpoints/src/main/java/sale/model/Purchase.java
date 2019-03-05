package sale.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.json.JSONObject;


@Entity
@Table(name = "purchase")
public class Purchase {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column
	private String client_name;
	
	@Column
	private String client_email;
	
	@Column
	private long client_card;
	
	@Column
	private int client_cv2;
	
	@Column
	private String client_street;
	
	@Column
	private String client_postalcode;
	
	@Column
	private String client_city;
	
	public Purchase(){};
	
	public Purchase(JSONObject jsonObj) {
		this.client_name = jsonObj.getString("_client_name");
		this.client_email = jsonObj.getString("_client_name");
		this.client_card = jsonObj.getLong("_client_card");
		this.client_cv2 = jsonObj.getInt("_client_cv2");
		this.client_street = jsonObj.getString("_client_street");
		this.client_postalcode = jsonObj.getString("_client_postal_code");
		this.client_city = jsonObj.getString("_client_city");
	}
	
	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public String getClientName() {
		return this.client_name;
	}
	public void setClientName(String client_name) {
		this.client_name = client_name;
	}
	
	public String getClientEmail() {
		return this.client_email;
	}
	public void setClientEmail(String client_email) {
		this.client_email = client_email;
	}
	
	public long getClientCard() {
		return this.client_card;
	}
	public void setClientCard(long client_card) {
		this.client_card = client_card;
	}
	
	public int getClientCV2() {
		return this.client_cv2;
	}
	public void setClientCV2(int client_cv2) {
		this.client_cv2 = client_cv2;
	}
	
	public String getClientStreet() {
		return this.client_street;
	}
	public void setClientStreet(String client_street) {
		this.client_street = client_street;
	}
	
	public String getClientPostalcode() {
		return this.client_postalcode;
	}
	public void setClientPostalcode(String client_postalcode) {
		this.client_postalcode = client_postalcode;
	}
	
	public String getClientCity() {
		return this.client_city;
	}
	public void setClientCity(String client_city) {
		this.client_city = client_city;
	}
	
	public String toString() {
		return "[id = " + this.id + "]" +
				", [client_name = " + this.client_name + "]" + 
				", [client_email = " + this.client_email + "]" + 
				", [client_card = " + this.client_card + "]" + 
				", [client_cv2 = " + this.client_cv2 + "]" + 
				", [client_street = " + this.client_street + "]" + 
				", [client_postalcode = " + this.client_postalcode + "]" + 
				", [client_city = " + this.client_city + "]"  ;
	}
	
}
