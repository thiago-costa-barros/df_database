"use server";

import { handleHotmartOrderNote } from "./orderEvents/handleHotmartOrderNote";
import { handleHotmartOutOfCheckoutNote } from "./outOfCheckoutEvents/handleHotmartOutOfCheckoutNote";
import { handleHotmartSubscriptionCancelationNote } from "./subscriptionCancelationEvents/handleHotmartsubscriptionCancelationNote";
import { handleHotmartSwitchPlanNote } from "./switchPlanEvents/handleHotmartSwitchPlanNote";
import { handleHotmartUpdateSubscriptionDateChargeNote } from "./updateSubscriptionDateChargeEvents/handleHotmartUpdateSubscriptionDateChargeNote";

export async function routeEventHotmartWebhook(eventName, eventData){
    console.log(`Routing event: ${eventName}`);
    
    switch (eventName) {
        case 'PURCHASE_OUT_OF_SHOPPING_CART':
            console.log(`Handling event: ${eventName}`);
            await handleHotmartOutOfCheckoutNote(eventData);
            break;
        case 'SUBSCRIPTION_CANCELLATION':
            console.log(`Handling event: ${eventName}`);
            await handleHotmartSubscriptionCancelationNote(eventData);
            break;
        case 'SWITCH_PLAN':
            console.log(`Handling event: ${eventName}`);
            await handleHotmartSwitchPlanNote(eventData);
            break;
        case 'UPDATE_SUBSCRIPTION_CHARGE_DATE':
            console.log(`Handling event: ${eventName}`);
            await handleHotmartUpdateSubscriptionDateChargeNote(eventData);
            break;
        default:
            console.log(`Handling event: ${eventName}`);
            await handleHotmartOrderNote(eventData);
            break;
    }
}