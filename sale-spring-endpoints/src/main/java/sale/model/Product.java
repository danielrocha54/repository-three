package sale.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class Product {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne
	@JoinColumn(name="category_id")
	private Category category;
	
	@Column
	private String name;
	
	@Column
	private float price;

	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public Category getCategory() {
		return this.category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	
	public String getName() {
		return this.name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public float getPrice() {
		return this.price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	
	public String toString() {
		return "[id = " + this.id + "]" +
				", [categoty = " + this.category.toString() + "]" + 
				", [name = " + this.name + "]" +
				", [price = " + this.price + "]";
	}
	
}
