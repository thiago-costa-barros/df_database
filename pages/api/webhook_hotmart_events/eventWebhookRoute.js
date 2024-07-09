"use server";

import { handleHotmartOrderNote } from "./orderEvents/handleHotmartOrderNote";
import { handleHotmartOutOfCheckoutNote } from "./outOfCheckoutEvents/handleHotmartOutOfCheckoutNote";
import { handleHotmartSubscriptionCancelationNote } from "./subscriptionCancelationEvents/handleHotmartsubscriptionCancelationNote";
import { handleHotmartSwitchPlanNote } from "./switchPlanEvents/handleHotmartSwitchPlanNote";
import { handleHotmartUpdateSubscriptionDateChargeNote } from "./updateSubscriptionDateChargeEvents/handleHotmartUpdateSubscriptionDateChargeNote";

export async function routeEventHotmartWebhook(eventName, eventData){
    switch (eventName) {
        case 'PURCHASE_OUT_OF_SHOPPING_CART':
            await handleHotmartOutOfCheckoutNote(eventData);
            break;
        case 'SUBSCRIPTION_CANCELLATION':
            await handleHotmartSubscriptionCancelationNote(eventData);
            break;
        case 'SWITCH_PLAN':
            await handleHotmartSwitchPlanNote(eventData);
            break;
        case 'UPDATE_SUBSCRIPTION_CHARGE_DATE':
            await handleHotmartUpdateSubscriptionDateChargeNote(eventData);
            break;
        default:
            await handleHotmartOrderNote(eventData);
            break;
    }
}
//UpdateSubscriptionDateCharge