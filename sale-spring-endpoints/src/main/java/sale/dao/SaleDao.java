package sale.dao;

import java.util.List;

import sale.model.Cart;
import sale.model.Product;
import sale.model.Purchase;

public interface SaleDao {
	
	List<Product> getGroceriesList();
	
	Purchase getPurchaseById(int id);
	
	Cart getCartById(int purchase_id, int product_id);
	
	int submitPurchase(Purchase purchase);
	
	boolean submitCart(Cart cart);
}
