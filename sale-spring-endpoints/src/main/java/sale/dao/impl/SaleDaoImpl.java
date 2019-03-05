package sale.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sale.dao.SaleDao;
import sale.model.Cart;
import sale.model.Product;
import sale.model.Purchase;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

@Component
public class SaleDaoImpl implements SaleDao {

	@Autowired
	private EntityManagerFactory entityManagerFactory;

	public List<Product> getGroceriesList() {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery criteria = builder.createQuery(Product.class);
		Root contactRoot = criteria.from(Product.class);
		criteria.select(contactRoot);
		List products = em.createQuery(criteria).getResultList();
		et.commit();
		em.close();
		return products;
	}
	
	public Purchase getPurchaseById(int id) {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery criteria = builder.createQuery(Purchase.class);
		Root contactRoot = criteria.from(Purchase.class);
		criteria.select(contactRoot).where(builder.equal(contactRoot.get("id"), id));
		List purchases = em.createQuery(criteria).getResultList();
		et.commit();
		em.close();
		return (Purchase) ((purchases.size() == 0)? null : purchases.get(0));
	}
	
	public Cart getCartById(int purchase_id, int product_id) {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery criteria = builder.createQuery(Purchase.class);
		Root contactRoot = criteria.from(Cart.class);
		criteria.select(contactRoot).where(builder.equal(contactRoot.get("purchase_id"), purchase_id));
		criteria.select(contactRoot).where(builder.equal(contactRoot.get("product_id"), product_id));
		List carts = em.createQuery(criteria).getResultList();
		et.commit();
		em.close();
		return (Cart) ((carts.size() == 0)? null : carts.get(0));
		
	}
	
	public int submitPurchase(Purchase purchase) {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		em.persist(purchase);
		et.commit();
		em.close();

		return (getPurchaseById(purchase.getId()) != null)? purchase.getId() : -1;
	}
	
	public boolean submitCart(Cart cart) {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		em.persist(cart);
		et.commit();
		em.close();
		
		return (getCartById(cart.getPurchaseId(), cart.getProductId()) != null);
	}

}
