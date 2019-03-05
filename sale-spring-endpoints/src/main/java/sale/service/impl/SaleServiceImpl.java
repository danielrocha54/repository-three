/**
 * 
 */
package sale.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sale.dao.SaleDao;
import sale.model.Cart;
import sale.model.Product;
import sale.model.Purchase;
import sale.service.SaleService;

@Service
public class SaleServiceImpl implements SaleService {
	
	@Autowired
	private SaleDao saleDao;

	public List<Product> getGroceriesList() {
		return saleDao.getGroceriesList();
	}

	public Purchase getPurchaseById(int id) {
		return saleDao.getPurchaseById(id);
	}
	
	public Cart getCartById(int purchase_id, int product_id) {
		return saleDao.getCartById(purchase_id, product_id);
	}
	
	public int submitPurchase(Purchase purchase) {
		return saleDao.submitPurchase(purchase);
	}

	public boolean submitCart(Cart cart) {
		return saleDao.submitCart(cart);
	}

}
