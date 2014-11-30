/*************************************************************/
/* Name :   Parthas Menethil                                            */
/* login :                                                      */
/*************************************************************/

/****************************************************************************/
/*              This function calculates the pizza price                    */
/*              This function does not belong to Parthas Menethil           */
/****************************************************************************/
function calculatePizzaPrice(){

   var priceList    = new Array(0.00, 11.55, 15.25, 22.00, 25.00); // The price for the different sizes

   var HST          = 0.13;                                        // HST current rate
   var TOPPING      = 1.79;                                        // Cost of each topping - First two are free

   var sizePrice    = 0, toppingCount = 0, toppingCost  = 0;
   var subTotal     = 0, hst          = 0, finalTotal   = 0;

   var whichSize    = 0;

   whichSize = document.onlineOrder.pizzaSize.selectedIndex;      // Get the pizza size they selected

   if (whichSize > 0) {                                           // They selected a valid pizza size
      sizePrice = priceList[whichSize];
   }
   else { 
      sizePrice = 0;                                              // They did not select a pizza size
   }

   // Determine the number of toppings if any 


   for (var i = 0; i < 12;i++){                                       
       if (document.onlineOrder.toppings[i].checked == true)     // check and count how many toppings
          toppingCount++;  
   }

   if (toppingCount < 3) toppingCount=0; else toppingCount=toppingCount-2; // The first 2 are free
   
   // Pizza price calculation based on what they selected


   toppingCost = Math.floor(((1.79 * toppingCount) + 0.005)*100); toppingCost = toppingCost /100;
   subTotal    = Math.floor(((sizePrice + toppingCost) + 0.005)*100);subTotal = subTotal /100;
   hst         = Math.floor((((subTotal * HST) + 0.005)*100));hst = hst/100;  // HST calculation

   finalTotal = (subTotal + hst).toFixed(2);


   // Results from store calculation

   document.onlineOrder.hPizzaPrice.value     = sizePrice;
   document.onlineOrder.hToppings.value       = toppingCount;
   document.onlineOrder.hToppingsCost.value   = toppingCost;
   document.onlineOrder.hSubTotal.value       = subTotal;
   document.onlineOrder.hHst.value            = hst;
   document.onlineOrder.hFinalTotal.value     = finalTotal;
   document.onlineOrder.price.value           = "$ " + finalTotal; // update price on the form

} // End of calculatePizzaPrice function


/****************************************************************************/
/*         You are not allowed to change any of the above function.         */
/****************************************************************************/

/****************************************************************************/
/*                  Your JavaScript starts here                             */
/*                                                                          */
/****************************************************************************/
/****************************************************************************/
/* @validateOrder                                                           */
/*                                                                          */
/* This validate order function calls each sub-validate function and        */
/* gathers the final result                                                 */
/*                                                                          */
/****************************************************************************/
 function validateOrder() {
	var errMsg = "";
	errMsg = validateSurname(errMsg);
	errMsg = validateClient(errMsg);
	errMsg = validatePhone(errMsg);
	errMsg = validateDOB(errMsg);
	errMsg = validateSize(errMsg);
	errMsg = validateCrust(errMsg);
	errMsg = validateCheese(errMsg);
	errMsg = validateSauces(errMsg);
	if (errMsg != ""){
		showErrors(errMsg);
		return false;
	}
	// call this @prePost function before submit the form
    prePost();
	return true;
 } 
/****************************************************************************/
/* @prePost                                                                 */
/* Since the validation have been done.                                     */
/* This function will do the following:                                     */
/* 1. Clear the former displayed error messages                             */
/* 2. Change the surname to a proper format                                 */
/* 3. Change the hidden field to a proper value                             */
/* 4. Recalculate the pizza price                                           */
/****************************************************************************/
  function prePost(){
	showErrors("");
	var preName = document.onlineOrder.surname.value;
	document.onlineOrder.surname.value = preName.substr(0,1).toUpperCase() + preName.substr(1).toLowerCase();
	document.onlineOrder.hJsActive.value = "Y";
	calculatePizzaPrice();
 }
 
/****************************************************************************/
/* The following fuctions are sub-validation functions                      */
/* The function name identifies which part it checks                        */
/****************************************************************************/

/****************************************************************************/
/* @validateSurname                                                         */
/****************************************************************************/
  function validateSurname(errMsg){
	var pName = document.onlineOrder.surname.value.toLowerCase(), alphs = 0;
	// [Check if it is empty]
	if (pName == ""){
		errMsg += genErrMsg("Name"," Name field cannot be empty.<br/>Please enter you name.");
		return errMsg;
	}
	// [Go through every character and count the alphabetics as well as take care of the apostrophe and the hyphen]
	// 
	for (var i = 0; i < pName.length; i++){
		// [Count alphabetic characters]
		if (pName.charCodeAt(i) >= 97 && pName.charCodeAt(i) <= 122){
			alphs++;
		}
		else if (pName.charAt(i) == "'"){
			if (!(pName.charCodeAt(i - 1) >= 97 && pName.charCodeAt(i - 1) <= 122 && pName.charCodeAt(i + 1) >= 97 && pName.charCodeAt(i + 1) <= 122)){
				errMsg += genErrMsg("Name","The apostrophe must between two alphabetic characters.<br/>Please either remove the apostrophe or put it between two alphabetic characters.");
				return errMsg;
			}
			// [Check if there are duplicated apostrophies]
			if (pName.lastIndexOf("'") != i){
				errMsg += genErrMsg("Name","Only one apostrophe is allowed in this field.<br/>Please remove other apostrophes.");
				return errMsg;
			}
		}
		else if (pName.charAt(i) == "-"){
			if (!(pName.charCodeAt(i - 1) >= 97 && pName.charCodeAt(i - 1) <= 122 && pName.charCodeAt(i + 1) >= 97 && pName.charCodeAt(i + 1) <= 122)){
				errMsg += genErrMsg("Name","The hyphen must between two alphabetic characters.<br/>Please either remove the hyphen or put it between two alphabetic characters.");
				return errMsg;
			}
			// [Check if there are duplicated hyphens]
			if (pName.lastIndexOf("-") != i){
				errMsg += genErrMsg("Name","Only one hyphen is allowed in this field.<br/>Please remove other hyphens.");
				return errMsg;
			}
		}
		// [No other characters allowed]
		else{
				errMsg += genErrMsg("Name","Only alphabetic, apostrophe and hyphen are allowed in this field.<br/>Please remove the invalid characters.");
				return errMsg;
		}
	}
	if (alphs < 4){
		errMsg += genErrMsg("Name","There is not enough alphabetic characters.<br/>Please enter at least 4 alphabetic characters.");
		return errMsg;
	}
	return errMsg;
 }
/****************************************************************************/
/* @validateClient                                                          */
/****************************************************************************/
  function validateClient(errMsg){
	var pClient = document.onlineOrder.client.value;
	// [Check if it is empty]
	if (pClient == ""){
		errMsg += genErrMsg("Client"," Account No. cannot be empty.");
		return errMsg;
	}
	// [Check if there are enough characters]
	if (pClient.length != 12){
		errMsg += genErrMsg("Client"," Account No. must be exact 12 characters.");
		return errMsg;
	}
	// [This loop check if there is a hypen at position 8 and if other characters are numeric]
	for (var i = 3; i < pClient.length; i++){
		if (i == 7){
			if (pClient.charAt(i) != "-"){
				errMsg += genErrMsg("Client","Position 8 must be hyphen (-).");
				return errMsg;
			}
		}
		else if (pClient.charCodeAt(i) < 48 || pClient.charCodeAt(i) > 57){
			errMsg += genErrMsg("Client","Position " + eval(i + 1) + " must be numeric.");
			return errMsg;
		}
	}
	// [Check if the first three characters is one of 416, 905, 647]
	if (pClient.substr(0,3) != "416" && pClient.substr(0,3) != "905" && pClient.substr(0,3) != "647"){
		errMsg += genErrMsg("Client","The first three characters must be 416 or 905 or 647.");
		return errMsg;
	}
	// [The value difference between position 4 and position 10 - (positive or negative) must be equal to the value in position 3]
	if (Math.abs(pClient.charAt(3) - pClient.charAt(9)) != pClient.charAt(2)){
		errMsg += genErrMsg("Client","The account number is not valid.<br/>Please check and enter the correct number.");
		return errMsg;
	}
	// [The sum of positions 4,5,6,7 must be greater than the sum of positions 9,10,11,12]
	if (eval(pClient.charCodeAt(3) + pClient.charCodeAt(4) + pClient.charCodeAt(5) + pClient.charCodeAt(6)) <= eval(pClient.charCodeAt(8) + pClient.charCodeAt(9) + pClient.charCodeAt(10) + pClient.charCodeAt(11))){
		errMsg += genErrMsg("Client","The account number is not valid.<br/>Please check and enter the correct number.");
		return errMsg;
	}
	return errMsg;
  }
/****************************************************************************/
/* @validatePhone                                                           */
/****************************************************************************/
  function validatePhone(errMsg){
	var pPhone = document.onlineOrder.phone.value;
	// [Check if it is empty]
	if (pPhone == ""){
		errMsg += genErrMsg("Phone","The phone number cannot be blank.<br/>Please enter a valid phone number in the format of nnn-nnn-nnnn.");
		return errMsg;
	}
	// [Check if there are enough characters]
	if (pPhone.length < 12){
		errMsg += genErrMsg("Phone","The phone number is not valid.<br/>Please enter a valid phone number in the format of nnn-nnn-nnnn.");
		return errMsg;
	}
	// [The loop checks if hyphens are at the proper place and if other characters are numeric]
	for (var i = 0; i < pPhone.length; i++){
		if (i == 3 || i == 7){
			if (pPhone.charAt(i) != '-'){
				errMsg += genErrMsg("Phone","The format of the phone number is incorrect.<br/>Please enter a valid phone number in the format of nnn-nnn-nnnn.");
				return errMsg;
			}
		}
		else if (pPhone.charCodeAt(i) < 48 || pPhone.charCodeAt(i) > 57){
			errMsg += genErrMsg("Phone","The format of the phone number is incorrect.<br />Please enter a valid phone number in the format of nnn-nnn-nnnn. (all n must be numeric)");
			return errMsg;
		}
	}
	// [Check the first three characters]
	var temp = pPhone.substr(0,3);
	if (temp != "416" && temp != "905" && temp != "647"){
		errMsg += genErrMsg("Phone","The area code (<span style='font-weight:bold;color:#ff0000;'>nnn</span>-nnn-nnnn) is not valid.<br />The supported area codes are 416, 905 and 647.");
		return errMsg;
	}
	// [Check if the first three code mateches those in the client number]
	else if (temp != document.onlineOrder.client.value.substr(0,3)){
		if (document.onlineOrder.client.value != ""){
			errMsg += genErrMsg("Phone","The area code (<span style='font-weight:bold;color:#ff0000;'>nnn</span>-nnn-nnnn) does not match the first three number of the account No. <br /> Please use a valid phone number or check your Account No.");
			return errMsg;
		}
	}
	// [Check the area code  ]
	// [First check the range]
	temp = pPhone.substr(4,3);
	if (temp < 203 || temp > 419){
		errMsg += genErrMsg("Phone","The exchange part (nnn-<span style='font-weight:bold;color:#ff0000;'>nnn</span>-nnnn) is not valid. <br /> The number of this part should between 203 and 419 inclusive.");
		return errMsg;
	}
	// [Here I found:               ]
	// [(AValidAreaCode - 2) % 3 = 0]
	else if ((temp - 2) % 3 != 0){
		errMsg += genErrMsg("Phone","The exchange part (nnn-<span style='font-weight:bold;color:#ff0000;'>nnn</span>-nnnn) is not valid. <br /> The number of this part must be a multiple of three.");
		return errMsg;
	}
	// Check the last four digits
	if (pPhone.substr(8,4) == "0000"){
		errMsg += genErrMsg("Phone","The last four digits (nnn-nnn-<span style='font-weight:bold;color:#ff0000;'>nnnn</span>) cannot be all zeros. <br />Please enter a valid phone number.");
		return errMsg;
	}
	return errMsg;
  } 

/****************************************************************************/
/* @validateDOB                                                             */
/****************************************************************************/
 function validateDOB(errMsg){
	var pDOB = document.onlineOrder.dob.value, m = new Array ("jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec");
	// [Check if it is empty]
	if (pDOB == ""){
		errMsg += genErrMsg("DOB","The date of birth cannot be blank.<br />Please enter a valid date in the format of mmmyyyy.");
		return errMsg;
	}
	// [Check if there are enough characters]
	if (pDOB.length < 7){
		errMsg += genErrMsg("DOB","The date of birth does not have enough characters.<br />Please enter a valid date in the format of mmmyyyy.");
		return errMsg;
	}
	// [Go through to see if the month abbreviation is valid]
	var temp = pDOB.substr(0, 3).toLowerCase();
	for (var x in m){
		if (temp == m[x]){
			temp = "Found";
		}
	}
	if (temp != "Found"){
		errMsg += genErrMsg("DOB","The first three characters must be a valid three letter abbreviation for a month.<br />Please enter one of the [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec].");
		return errMsg;
	}
	// [If it is valid. Check the case]
	temp = pDOB.substr(0, 3);
	if (temp != temp.toUpperCase() && temp != temp.toLowerCase()){
		errMsg += genErrMsg("DOB","In the month part(<span style='font-weight:bold;color:#ff0000'>mmm</span>yyyy), a mix of upper and lower case is now allowed.<br />Please type all letters in either lower or upper case.");
		return errMsg;
	}
	// [Go through the rest to see if they are numeric]
	for (var i = 3; i < pDOB.length; i++){
		if (pDOB.charCodeAt(i) < 48 || pDOB.charCodeAt(i) > 57){
			errMsg += genErrMsg("DOB","In the year part(mmm<span style='font-weight:bold;color:#ff0000'>yyyy</span>), all digits must be numeric.");
			return errMsg;
		}
	}
	// [Calculate and validate the year]
	var myDate = new Date();
	if (myDate.getFullYear() - pDOB.substr(3, 4) < 18){
		errMsg += genErrMsg("DOB","The year(mmm<span style='font-weight:bold;color:#ff0000'>yyyy</span>) must be at least 18 years less than the current year;");
		return errMsg;
	}
	return errMsg;
 }
/****************************************************************************/
/* @validateSize                                                            */
/****************************************************************************/
 function validateSize(errMsg){
	var selected = document.onlineOrder.pizzaSize.selectedIndex;
	if (selected == -1 || selected == 0){
		errMsg += genErrMsg("Size"," Please Select One Pizza Size");
		
	}
	return errMsg;
 }
/****************************************************************************/
/* @validateCrust                                                           */
/****************************************************************************/
 function validateCrust(errMsg){
	var selected = document.onlineOrder.pizzaCrust.selectedIndex;
	if (selected == -1){
		errMsg += genErrMsg("Crust"," Please Select One Crust");
		
	}
	return errMsg;
 }
/****************************************************************************/
/* @validateCheese                                                          */
/****************************************************************************/
  function validateCheese(errMsg){
	var c = document.onlineOrder.cheese;
	for (x in c){
		if (c[x].checked == true){
			return errMsg;
		}
	}
	errMsg += genErrMsg("Cheese"," Please Select One Cheese");
	return errMsg;
 }
/****************************************************************************/
/* @validateSauces                                                          */
/****************************************************************************/
  function validateSauces(errMsg){
	var c = document.onlineOrder.sauce;
	for (var x in c){
		if (c[x].checked == true){
			return errMsg;
		}
	}
	errMsg += genErrMsg("Sauces"," Please Select One Sauce");
	return errMsg;
 }

/****************************************************************************/
/* @genErrMsg                                                               */
/* Construct the error message to a proper format                           */
/* It makes it easier to modify the error layout to adapt to different      */
/* circumstances.                                                           */
/****************************************************************************/
function genErrMsg(title, dsp){
	return "<tr><td style='border: 1px solid #000000'>" + title + "</td>" + "<td style='border: 1px solid #000000'>" + dsp +"</td></tr>";
}
/****************************************************************************/
/* @showErrors                                                              */
/* Print the error messages to the html page.                               */
/****************************************************************************/
function showErrors(messages) {

        messages = "<table class='errorsTable' id='errorsTable'>" + messages + "</table>";
      
        document.getElementById('errors').innerHTML = messages;

}