

export const getDeliveryPrice = (price:number)=>{
	if(price >= 769){
		return 0
	}else if (price >= 650){
		return 50
	}else if (price >= 500){
		return 100
	}
	else if (price >= 1){
		return 300
	}
}