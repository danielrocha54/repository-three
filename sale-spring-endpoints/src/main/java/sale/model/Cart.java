package sale.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column
	private int purchase_id;

	@Id
	@Column
	private int product_id;
	
	@Column
	private int quantity;
	
	public Cart(){}
	
	public Cart(int purchase_id, int product_id, int quantity) {
		this.purchase_id = purchase_id;
		this.product_id = product_id;
		this.quantity = quantity;
	}
	
	public int getPurchaseId() {
		return this.purchase_id;
	}
	public void setPurchaseId(int purchase_id) {
		this.purchase_id = purchase_id;
	}

	public int getProductId() {
		return this.product_id;
	}
	public void setProductId(int product_id) {
		this.product_id = product_id;
	}
	
	public int getQuantity() {
		return this.quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	public String toString() {
		return "[product_id = " + this.product_id + "]" +
				", [purchase_id = " + this.purchase_id + "]" + 
				", [quantity = " + this.quantity + "]";
	}
	
}
