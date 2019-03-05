package sale.controller;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.util.UriComponentsBuilder;

import sale.model.AppResponse;
import sale.model.Cart;
import sale.model.Product;
import sale.model.Purchase;
import sale.service.SaleService;

@Controller
public class SaleController {

	@Autowired
	private SaleService saleService;

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/api/groceries", method = RequestMethod.GET)
	public ResponseEntity<AppResponse> locationDetails() {
		
		List<Product> groceriesList = saleService.getGroceriesList();
		return new ResponseEntity<AppResponse>(new AppResponse(200, "OK", groceriesList), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/api/purchase", method = RequestMethod.POST)
	public ResponseEntity<AppResponse> addLocation(@RequestBody String data) {
		
		JSONObject jsonObj = new JSONObject(data);
		
		Purchase purchase = new Purchase(jsonObj);
		
		int purchaseId = saleService.submitPurchase(purchase);
		boolean cartCreated = false;
        
        AppResponse appResponse = new AppResponse();
        
        if (purchaseId == -1) {
        	appResponse.setHTTPStatus(400);
        	appResponse.setErrorMessage("purchase not created");
        } else {
        	appResponse.setHTTPStatus(200);
        	appResponse.setErrorMessage("OK");
        	
        	JSONArray products = jsonObj.getJSONArray("_products");
        	JSONObject product;
        	
        	for (int i = 0; i < products.length(); i++) {
        		product = products.getJSONObject(i);        		
        		cartCreated = saleService.submitCart(new Cart(purchaseId, product.getInt("_product_id"), product.getInt("_quantity")));
        		if (!cartCreated) {
        			appResponse.setErrorMessage("problem occurred while saving purchase");
        		}
        	}
        	
        }
        
        return new ResponseEntity<AppResponse>(appResponse, (purchaseId != -1)? HttpStatus.CREATED : HttpStatus.CONFLICT);
	}
}
