const Endpoint = {

    login : ['mobile-user-login'],
    order : ['pickup-officer/dashboard'],
    orderDetais : ['pickup-officer/order-details?'],
    orderMerchant : ['pickup-officer/order-count-merchant-wise?'],
    orderReceive : ['pickup-officer/change-order-status?'],
    branchSacBarcodeDetails : ['pickup-officer/branch-sack-barcode-details'],
    pickOrderToVan : ['pickup-officer/branch-sack-barcode-order-status-update?'],
    orderInVan : ['pickup-officer/branch-van-barcode-details'],


    storeOrderCheck : ['store-user/pickup-officer-wise-order?'],
    storeOrderDetails : ['store-user/order-details?'],
    storeChngeOrderStatus : ['store-user/change-order-status?'],
    storeDataBranchWise : ['store-user/delivery-branch-wise-order'],
    storeAreaDataBranchWise : ['store-user/delivery-area-wise-order-count?'],
    storeOrderAreaSacCode : ['store-user/assign-orders-to-sack-barcode?'],
    storeOrderBranchSacCode : ['store-user/assign-sack-barcode-to-branch-sack-barcode'],

    // Delivery
    getDeliveryDashboard : ['delivery-officer/dashboard'],
    assignedDetails : ['delivery-officer/area-wise-order-details-status?'],
    deliveryOrderDetails : ['delivery-officer/order-details?'],
    ReceiveOrder: ['delivery-officer/change-order-status?'],
    orderDetailsCustomerWise : ['delivery-officer/order-count-customer-wise?'],
    orderDelivery : ['delivery-officer/order-delivery?'],
    orderCollectionData : ['delivery-officer/order-amount-collected']

    

}

export default Endpoint