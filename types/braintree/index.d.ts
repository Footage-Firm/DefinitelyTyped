// Type definitions for braintree
// Project: https://github.com/braintree/braintree_node
// Definitions by: Sam Rubin <https://github.com/smrubin>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'braintree' {

    /**
     * Braintree Config and Client
     */

    export enum Environment {
        Production,
        Sandbox
    }

    export interface Config {
        environment: Environment;
        merchantId: string;
        publicKey: string;
        privateKey: string;
    }

    export class BraintreeGateway {
        constructor(config: Config);

        config: any;
        testing: any;

        addOn: AddOnGateway;
        address: AddressGateway;
        clientToken: ClientTokenGateway;
        creditCard: CreditCardGateway;
        creditCardVerification: CreditCardVerificationGateway;
        customer: CustomerGateway;
        discount: DiscountGateway;
        dispute: DisputeGateway;
        merchantAccountGateway: MerchantAccountGateway;
        paymentMethod: PaymentMethodGateway;
        paymentMethodNonce: PaymentMethodNonceGateway;
        plan: PlanGateway;
        settlementBatchSummary: SettlementBatchSummaryGateway;
        subscription: SubscriptionGateway;
        transaction: TransactionGateway;
        transactionLineItem: TransactionLineItemGateway;
    }

    type Entity = 'address' | 'creditCard' | 'customer' | 'dispute' | 'merchantAccount' | 'paymentMethod' | 'settlementBatchSummary' | 'subscription' | 'transaction';

    type ValidatedResponse<T> = {
        [key in Entity]: T;
    } & {
        success: boolean;
        errors: () => string[];
        message: string;
        params: Record<string, any>;
    }


    /**
     * Gateways
     */

    export class AddOnGateway {
        all(): Promise<AddOnResponse[]>;
    }

    export class AddressGateway {
        create(request: AddressRequest): Promise<ValidatedResponse<AddressResponse>>;
        delete(customerId: string, addressId: string): Promise<void>;
        find(customerId: string, addressId: string): Promise<AddressResponse>;
        update(customerId: string, addressId: string, updates: Address): Promise<ValidatedResponse<AddressResponse>>;
    }

    export class ClientTokenGateway {
        generate(request: ClientTokenRequest): Promise<string>;
    }

    export class CreditCardGateway {
        create(request: CreditCardCreateRequest): Promise<ValidatedResponse<CreditCardResponse>>;
        delete(creditCardToken: string): Promise<void>;
        expiringBetween(startDate: Date, endDate: Date): Promise<CreditCardResponse>;
        find(creditCardToken: string): Promise<CreditCardResponse>;
        update(creditCardToken: string, updates: CreditCardUpdateRequest): Promise<ValidatedResponse<CreditCardResponse>>;
    }

    export class CreditCardVerificationGateway {
        search(searchFn: any): Promise<CreditCardVerificationResponse[]>;
    }

    export class CustomerGateway {
        create(request: CustomerCreateRequest): Promise<ValidatedResponse<CustomerResponse>>;
        delete(customerId: string): Promise<void>;
        find(customerId: string): Promise<CustomerResponse>;
        search(searchFn: any): Promise<CustomerResponse[]>;
        update(customerId: string, updates: CustomerUpdateRequest): Promise<ValidatedResponse<CustomerResponse>>;
    }

    export class DiscountGateway {
        all(): Promise<DiscountResponse[]>;
    }

    export class DisputeGateway {
        accept(disputeId: string): Promise<ValidatedResponse<DisputeResponse>>;
        addFileEvidence(disputeId: string, evidence: { documentId: string, category?: string }): Promise<ValidatedResponse<Evidence>>;
        addTextEvidence(disputeId: string, evidence: { content: string, category?: string}): Promise<ValidatedResponse<Evidence>>;
        finalize(disputeId: string): Promise<ValidatedResponse<DisputeResponse>>;
        find(disputeId: string): Promise<DisputeResponse>;
        removeEvidence(disputeId: string, evidenceId: string): Promise<ValidatedResponse<DisputeResponse>>;
        search(searchFn: any): Promise<DisputeResponse[]>;
    }

    export class MerchantAccountGateway {
        all(): Promise<MerchantAccountResponse[]>;
        create(request: MerchantAccountCreateRequest): Promise<ValidatedResponse<MerchantAccountResponse>>;
        createForCurrency(currency: string, id?: string): Promise<ValidatedResponse<MerchantAccountResponse>>;
        update(merchantAccountId: string, updates: MerchantAccountRequest): Promise<ValidatedResponse<MerchantAccountResponse>>;
        find(merchantAccountId: string): Promise<MerchantAccountResponse>;
    }

    export class PaymentMethodGateway {
        create(request: PaymentMethodCreateRequest): Promise<ValidatedResponse<PaymentMethodResponse>>;
        delete(token: string): Promise<void>;
        find(token: string): Promise<PaymentMethodResponse>;
        grant(sharedPaymentMethodToken: string, options: {allowVaulting?: boolean, includeBillingPostalCode?: boolean, revokeAfter?: Date }): Promise<string>;
        revoke(sharedPaymentMethodToken: string): Promise<void>;
        update(token: string, updates: PaymentMethodUpdateRequest): Promise<ValidatedResponse<PaymentMethodResponse>>;
    }

    export class PaymentMethodNonceGateway {
        create(paymentMethodToken: string): Promise<ValidatedResponse<PaymentMethodNonceResponse>>;
        find(paymentMethodNonce: string): Promise<PaymentMethodNonceResponse>;
    }

    export class PlanGateway {
        all(): Promise<PlanResponse[]>;
    }

    export class SettlementBatchSummaryGateway {
        generate(request: {settlementDate: string, groupByCustomField?: string}): Promise<SettlementBatchSummaryResponse>;
    }

    export class SubscriptionGateway {
        cancel(subscriptionId: string): Promise<void>;
        create(request: SubscriptionRequest): Promise<ValidatedResponse<SubscriptionResponse>>;
        find(subscriptionId: string): Promise<SubscriptionResponse>;
        retryCharge(subscriptionId: string, amount?: string, submitForSettlement?: boolean): Promise<ValidatedResponse<SubscriptionResponse>>;
        search(searchFn: any): Promise<SubscriptionResponse[]>;
        update(subscriptionId: string, updates: SubscriptionRequest): Promise<ValidatedResponse<SubscriptionResponse>>;
    }

    export class TransactionGateway {
        cancelRelease(transactionId: string): Promise<void>;
        cloneTransaction(transactionId: string, options: {amount: string, options: {submitForSettlement: boolean}}): Promise<void>;
        find(transactionId: string): Promise<TransactionResponse>;
        holdInEscrow(transactionId: string): Promise<TransactionResponse>;
        refund(transactionId: string, amount?: string): Promise<ValidatedResponse<TransactionResponse>>;
        releaseFromEscrow(transactionId: string): Promise<TransactionResponse>;
        sale(request: TransactionRequest): Promise<ValidatedResponse<TransactionResponse>>;
        search(searchFn: any): Promise<TransactionResponse[]>;
        submitForPartialSettlement(authorizedTransactionId: string, amount: string): Promise<ValidatedResponse<TransactionResponse>>;
        submitForSettlement(transactionId: string, amount?: string): Promise<ValidatedResponse<TransactionResponse>>;
        void(transactionId: string): Promise<ValidatedResponse<TransactionResponse>>;
    }

    export class TransactionLineItemGateway {
        findAll(transactionId: string): Promise<TransactionLineItemResponse[]>;
    }

    /**
     * Interfaces for Request and Response Objects
     */

    /**
     * Add-On
     */

    export interface AddOn {
        amount?: string;
        neverExpires?: boolean;
        numberOfBillingCycles?: number;
        quantity?: number;
    }

    export interface AddOnRequest extends AddOn {}

    export interface AddOnAddRequest extends AddOnRequest {
        inheritedFromId: string;
    }

    export interface AddOnUpdateRequest extends AddOnRequest {
        existingId: string;
    }

    export interface AddOnResponse extends AddOn {
        currentBillingCycle?: number;
        description?: string;
        id: string;
        kind?: string;
        name: string;
    }

    /**
     * Address
     */

    export interface BillingAddress {
        company?: string;
        countryName?: string;
        extendedAddress?: string;
        firstName?: string;
        lastName?: string;
        locality?: string;
        postalCode?: string;
        region?: string;
        streetAddress?: string;
    }

    export interface Address extends BillingAddress {
        countryCodeAlpha2?: string;
        countryCodeAlpha3?: string;
        countryCodeNumeric?: string;
    }

    export interface AddressRequest extends Address {
        customerId: string;
    }

    export interface AddressResponse extends Address {
        createdAt: Date;
        customerId: string;
        id: string;
        updatedAt: Date;
    }

    /**
     * Client Token
     */

    export interface ClientTokenRequest {
        customerId?: string;
        merchantAccountId?: string;
        options?: {
            failOnDuplicatePaymentMethod?: boolean;
            makeDefault?: boolean;
            verifyCard?: boolean;
        }
        version?: string;
    }

    /**
     * Credit Card
     */

    export interface CreditCard extends PaymentMethod {
        cardholderName?: string;
        expirationDate?: string;
        expirationMonth?: string;
        expirationYear?: string;
    }

    export interface CreditCardRequest extends CreditCard {
        cvv?: string;
        number?: string;
    }

    export interface CreditCardCreateRequest extends CreditCardRequest {
        billingAddress?: Address;
        billingAddressId?: string;
        customerId: string;
        options?: {
            failOnDuplicatePaymentMethod?: boolean;
            makeDefault?: boolean;
            verificationAmount?: string;
            verificationMerchantAccountId?: string;
            verifyCard?: boolean;
        }
        paymentMethodNonce?: string;
        token?: string;
    }

    export interface CreditCardUpdateRequest extends CreditCardRequest {
        billingAddress?: Address & { options?: { updateExisting?: boolean }};
    }

    export interface CreditCardCoreResponse extends CreditCard {
        bin: string;
        cardType: string;
        commercial: Commercial;
        countryOfIssuance: string;
        customerLocation: CustomerLocation;
        debit: string;
        durbinRegulated: DurbinRegulated;
        healthcare: HealthCare;
        issuingBank: string;
        last4: string;
        payroll: Payroll;
        prepaid: Prepaid;
        productId: string;
        token: string;
        uniqueNumberIdentifier: string;
    }

    export interface CreditCardResponse extends CreditCardCoreResponse {
        billingAddress: AddressResponse;
        createdAt: Date;
        customerId: string;
        default: boolean;
        expired: boolean;
        imageUrl: string;
        maskedNumber: string;
        subscriptions: SubscriptionResponse[];
        updatedAt: Date;
        verification: CreditCardVerificationResponse;
    }

    /**
     * Credit Card Verification
     */

    export interface CreditCardVerification {
        amount: string;
        avsErrorResponseCode?: string;
        avsPostalCodeResponseCode?: string;
        avsScreetAddressResponseCode?: string;
        billing?: BillingAddress;
        creditCard?: CreditCardCoreResponse;
        createdAt: Date;
        currencyIsoCode: string;
        cvvResponseCode: string;
        gatewayRejectionReason?: string;
        id: string;
        merchantAccountId: string;
        processorResponseCode: string;
        processorResponseText: string;
        processorResponseType: string;
        riskData: TransactionRiskData;
        status: string;
    }

    export interface CreditCardVerificationResponse extends CreditCardVerification {}

    /**
     * Customer
     */

    export interface Customer {
        company?: string;
        customFields?: any; //A collection of custom field/value pairs
        email?: string;
        fax?: string;
        firstName?: string;
        id: string;
        lastName?: string;
        phone?: string;
        website?: string;
    }

    export interface CustomerRequest extends Customer {
        deviceData?: string;
        paymentMethodNonce?: string;
        riskData?: CustomerRiskData;
    }

    export interface CustomerCreateRequest extends CustomerRequest {
        creditCard?: CreditCardCreateRequest;
    }

    export interface CustomerUpdateRequest extends CustomerRequest {
        creditCard?: CreditCardUpdateRequest;
        defaultPaymentMethodToken?: string;
    }

    export interface CustomerResponse extends Customer {
        addresses: AddressResponse[];
        androidPayCards: AndroidPayCardResponse[];
        applePayCards: ApplePayCardResponse[];
        createdAt: Date;
        creditCards: CreditCardResponse[];
        masterpassCards: MasterpassCardResponse[];
        paymentMethods: PaymentMethodResponse[];
        paypalAccounts: PayPalAccountResponse[];
        samsungPayCards: SamsungPayCardResponse[];
        updatedAt: Date;
        venmoAccounts: VenmoAccountResponse[];
        visaCheckoutCards: VisaCheckoutCardResponse[];
    }

    export interface CustomerRiskData {
        customerBrowser?: string;
        customerIp?: string;
    }

    /**
     * Discount
     */

    export interface Discount {
        amount?: string;
        neverExpires?: boolean;
        numberOfBillingCycles?: number;
        quantity?: number;
    }

    export interface DiscountRequest extends Discount {}

    export interface DiscountAddRequest extends DiscountRequest {
        inheritedFromId: string;
    }

    export interface DiscountUpdateRequest extends DiscountRequest {
        existingId: string;
    }

    export interface DiscountResponse extends Discount {
        currentBillingCycle?: number;
        description?: string;
        id: string;
        kind?: string;
        name: string;
    }

    /**
     * Dispute
     */

    export interface Dispute {
        amountDisputed: string;
        amountWon: string;
        caseNumber: string;
        createdAt: Date;
        currencyIsoCode: string;
        evidence: Evidence;
        id: string;
        kind: string;
        merchantAccountId: string;
        originalDisputeId: string;
        processorComments: string;
        reason: string;
        reasonCode: string;
        reasonDescription: string;
        receivedDate: Date;
        referenceNumber: string;
        replyByDate: Date;
        status: DisputeStatus;
        statusHistory: DisputeStatusHistory;
        transaction: {
            amount: string;
            createdAt: Date;
            id: string;
            orderId: string;
            paymentInstrumentSubtype: string;
            purchaseOrderNumber: string;
        }
        updatedAt: Date;
    }

    export interface DisputeResponse extends Dispute {}

    export enum DisputeStatus {
        Accepted,
        Disputed,
        Expired,
        Open,
        Lost,
        Won,
    }

    export interface DisputeStatusHistory {
        disbursementDate: Date;
        effectiveDate: Date;
        status: DisputeStatus;
        timestamp: Date;
    }

    export interface Evidence {
        comment: string;
        createdAt: Date;
        id: string;
        sendToProcessorAt: Date;
        url: string;
    }

    /**
     * Merchant Account
     */

    export interface MerchantAccount {
        business?: MerchantBusiness;
        funding: MerchantFunding;
        id: string;
        individual: MerchantIndividual;
        status: MerchantAccountStatus;
    }

    export interface MerchantAccountRequest extends MerchantAccount {
        masterMerchantAccountId: string;
    }

    export interface MerchantAccountCreateRequest extends MerchantAccountRequest {
        tosAccepted: boolean;
    }

    export interface MerchantAccountResponse extends MerchantAccount {
        currencyIsoCode: string;
        default: boolean;
        masterMerchantAccount?: MerchantAccount;
    }

    export interface MerchantBusiness {
        address?: MerchantAddressDetails;
        addressDetails?: MerchantAddressDetails;
        dbaName?: string;
        legalName?: string;
        taxId?:string;
    }

    export interface MerchantAddressDetails {
        locality: string;
        postalCode: string;
        region: string;
        streetAddress: string;
    }

    export interface MerchantFunding {
        accountNumber?: string;
        accountNumberLast4?: string;
        descriptor?: string;
        destination: string;
        email?: string;
        mobilePhone?: string;
        routingNumber?: string;
    }

    export interface MerchantIndividual {
        addressDetails: MerchantAddressDetails;
        dateOfBirth: string;
        email: string;
        firstName: string;
        lastName: string;
        phone?: string;
        ssn?: string;
        ssnLast4?: string;
    }

    export enum MerchantAccountStatus {
        Pending,
        Active,
        Suspended,
    }

    /**
     * Payment Method
     */

    export interface PaymentMethod {}

    export interface PaymentMethodRequest extends PaymentMethod {
        billingAddressId?: string;
        cardholderName?: string;
        cvv?: string;
        deviceData?: string;
        expirationDate?: string;
        expirationMonth?: string;
        expirationYear?: string;
        number?: string;
        paymentMethodNonce: string;
    }

    export interface PaymentMethodCreateRequest extends PaymentMethodRequest {
        billingAddress?: Address;
        customerId: string;
        options?: {
            failOnDuplicatePaymentMethod?: boolean;
            makeDefault?: boolean;
            verificationAcmount?: string;
            verificationMerchantAccountId?: string;
            verifyCard?: boolean;
        };
    }

    export interface PaymentMethodUpdateRequest extends PaymentMethodRequest {
        billingAddress?: Address & { options?: { updateExisting?: boolean }};
        options?: {
            makeDefault?: boolean;
            verificationAcmount?: string;
            verificationMerchantAccountId?: string;
            verifyCard?: boolean;
        };
    }

    // Payment method response is an instace of one of these response types
    type PaymentMethodResponse = AndroidPayCardResponse | ApplePayCardResponse | PayPalAccountResponse | CreditCardResponse | SamsungPayCardResponse | VenmoAccountResponse | VisaCheckoutCardResponse | MasterpassCardResponse;

    /**
     * Payment Method Nonce
     */

    export interface PaymentMethodNonce {
        binData?: BinData;
        default?: boolean;
        details?: NonceDetails;
        nonce: string;
        threeDSecureInfo?: TransactionThreeDSecureInfo;
        type?: PaymentMethodType;
    }

    export interface PaymentMethodNonceResponse extends PaymentMethodNonce {}

    export interface BinData {
        commercial?: Commercial;
        countryOfIssuance?: string;
        debit?: Debit;
        durbinRegulated?: DurbinRegulated;
        healthcare?: HealthCare;
        issuingBank?: string;
        payroll?: Payroll;
        prepaid?: Prepaid;
        productId?: string;
    }

    export interface NonceDetails {
        bin?: string;
        cardType?: string;
        lastTwo?: string;
    }

    export enum PaymentMethodType {
        AndroidPayCard,
        ApplePayCard,
        CreditCard,
        MasterpassCard,
        PayPalAccount,
        UsBankAccount,
        VenmoAccount,
        VisaCheckoutCard,
        SamsungPayCard,
    }

    /**
     * Plan
     */

    export interface Plan {
        addOns: AddOnResponse[];
        billingDayOfMonth: number;
        billingFrequency: number;
        createdAt: Date;
        currenyIsoCode: string;
        description?: string;
        discounts?: DiscountResponse[];
        id: string;
        name: string;
        numberOfBillingCycles: number;
        price: string;
        trialDuration: number;
        trialDurationUnit: string;
        trialPeriod: boolean;
        updatedAt: Date;
    }

    export interface PlanResponse extends Plan {}

    /**
     * Settlement Batch Summary
     */

    export interface SettlementBatchSummary {
        records: Record<string, any>[];
    }

    export interface SettlementBatchSummaryResponse extends SettlementBatchSummary {}

    /**
     * Subscription
     */

    export interface Subscription {
        billingDayOfMonth?: number;
        descriptor?: Descriptor;
        firstBillingDate?: Date;
        id: string;
        merchantAccountId: string;
        neverExpires?: boolean;
        numberOfBillingCycles?: number;
        paymentMethodToken: string;
        planId: string;
        price?: string;
        trialDuration?: number;
        trialDurationUnit?: string;
        trialPeriod?: boolean;
    }

    export interface SubscriptionResponse extends Subscription {
        addOns: AddOnResponse[];
        balance: string;
        billingPeriodEndDate: Date;
        billingPeriodStartDate: Date;
        currentBillingCycle: number;
        daysPastDue: number;
        discounts: DiscountResponse[]
        failureCount: number;
        nextBillAmount: string;
        nextBillingDate: Date;
        nextBillingPeriodAmount: string;
        paidThroughDate: Date;
        status: SubscriptionStatus;
        statusHistory: SubscriptionHistory[];
        transactions: Transaction[];
        createdAt: Date;
        updatedAt: Date;
    }

    export interface SubscriptionRequest extends Subscription {
        addOns?: {
            add?: AddOnAddRequest[];
            remove?: string[];
            update?: AddOnUpdateRequest[];
        };
        discounts?: {
            add?: DiscountAddRequest[];
            remove?: string[];
            update?: DiscountUpdateRequest[];
        };
        options?: {
            doNotInheritAddOnsOrDiscounts?: boolean;
            paypal?: {
                description?: string;
            }
            startImmediately?: boolean;
        };
        paymentMethodNonce?: string;
        paymentMethodToken: string;
    }

    export interface SubscriptionHistory {
        balance: string;
        price: string;
        status: SubscriptionStatus;
        subscriptionSource: SubscriptionSource;
    }

    export enum SubscriptionStatus {
        Active,
        Canceled,
        Expired,
        PastDue,
        Pending,
    }

    export enum SubscriptionSource {
        api,
        control_panel,
        recurring,
    }

    /**
     * Transaction
     */

    export interface Transaction {
        amount: string;
        channel?: string;
        customFields?: Record<string, any>;
        customer?: Customer;
        descriptor?: Descriptor;
        discountAmount?: string;
        lineItems: TransactionLineItem[];
        merchantAccountId?: string;
        orderId?: string;
        purchaseOrderNumber?: string;
        recurring?: boolean; // Deprecated
        serviceFeeAmount?: string;
        shipping?: Address;
        shippingAmount?: string;
        shipsFromPostalCode?: string;
        taxAmount?: string;
        taxExempt?: boolean;
    }

    export interface TransactionRequest extends Transaction {
        billing?: Address;
        billingAddressId?: string;
        creditCard?: CreditCardRequest & {token?: string};
        customerId?: string;
        deviceData?: string;
        deviceSessionId?: string;
        externalVault?: {
            previousNetworkTransactionId?: string;
            status?: string;
        }
        options?: {
            addBillingAddressToPaymentMethod?: boolean;
            holdInEscrow?: boolean;
            paypal?: {
                customField?: string;
                description?: string;
            }
            skipAdvancedFraudChecking?: boolean;
            skipAvs?: boolean;
            skipCvv?: boolean;
            storeInVault?: boolean;
            storeInVaultOnSuccess?: boolean;
            storeShippingAddressInVault?: boolean;
            submitForSettlement?: boolean;
            threeDSecure?: {
                required?: boolean
            }
            venmo?: {
                profileId?: string;
            }
        }
        paymentMethodNonce?: string;
        paymentMethodToken?: string;
        riskData?: CustomerRiskData;
        sharedBillingAddressId?: string;
        sharedCustomerId?: string;
        sharedPaymentMethodNonce?: string;
        sharedPaymentMethodToken?: string;
        sharedShippingAddressId?: string;
        shippingAddressId?: string;
        threeDSecurePassThru?: {
            cavv?: string;
            eciFlag: string;
            threeDSecureVision?: string;
            xid?: string;
        }
        transactionSource?: string;
    }

    export interface TransactionResponse extends Transaction {
        addOns: AddOnResponse[];
        additionalProccessorResponse: string;
        androidPayCard: AndroidPayCard & {
            commercial: Commercial
            countryOfIssuance: string;
            debit: Debit;
            durbinRegulated: DurbinRegulated;
            healthcare: HealthCare;
            payroll: Payroll;
            prepaid: Prepaid;
            productId: string;
        };
        applePayCard: ApplePayCard & {
            commercial: Commercial
            countryOfIssuance: string;
            debit: Debit;
            durbinRegulated: DurbinRegulated;
            healthcare: HealthCare;
            issuingBank: string;
            payroll: Payroll;
            prepaid: Prepaid;
            productId: string;
        };
        authorizationAdjustments: AuthorizationAdjustment[];
        authorizationExpiresAt: Date;
        avsErrorResponseCode: string;
        avsPostalCodeResponseCode: string;
        avsStreetAddressResponseCode: string;
        billing: Address & {id?: string};
        creditCard?: CreditCardCoreResponse & {imageUrl?: string, maskedNumber?: string};
        currencyIsoCode: string;
        cvvResponseCode: string;
        disbursementDetails?: DisbursementDetails;
        discountAmount: string;
        discounts: DiscountResponse[];
        disputes: DisputeResponse[];
        escrowStatus: EscrowStatus;
        facilitatedDetails: FacilitatedDetails;
        facilitatorDetails: FacilitatorDetails;
        gatewayRejectionReason: GatewayRejectionReason;
        id: string;
        masterpassCardDetails: MasterpassCard;
        networkTransactionId: string;
        paymentInstrumentType: PaymentInstrumentType;
        paypalAccount: PayPalAccount & {
            authorizationId: string;
            captureId: string;
            customField: string;
            payerEmail: string;
            payerFirstName: string;
            payerLastName: string;
            payerStatus: string;
            paymentId: string;
            refundFromTransactionFeeAmount: string;
            refundFromTransactionFeeCurrencyIsoCode: string;
            refundId: string;
            sellerProtectionStatus: string;
            taxId: string;
            taxIdType: string;
            transactionFeeAmount: string;
            transactionFeeCurrencyIsoCode: string;
        };
        planId: string;
        processorAuthorizationCode: string;
        processorResponseCode: string;
        processorResponseText: string;
        processorResponseType: TransactionProcessorResponseType;
        processorSettlementResponseCode: string;
        processorSettlementResponseText: string;
        refundIds: string[];
        refundedTransactionId: string;
        riskData: TransactionRiskData;
        samsungPayCardDetails: SamsungPayCard;
        settlementBatchId: string;
        shipping: Address & {id?: string};
        status: TransactionStatus;
        statusHistory: TransactionStatusHistory;
        subscription: {
            billingPeriodEndDate: Date;
            billingPeriodStartDate: Date;
        }
        subscriptionId: string;
        threeDSecureInfo: TransactionThreeDSecureInfo;
        type: string;
        venmoAccount: VenmoAccount;
        visaCheckoutCardDetails: VisaCheckoutCard;
        voiceReferralNumber: string;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface AuthorizationAdjustment {
        amount: string;
        success: boolean;
        timestamp: Date;
        processorResponseType: string;
        processorResponseCode: string;
        processorResponseText: string;
    }

    export interface Descriptor {
        name: string;
        phone: string;
        url: string;
    }

    export interface DisbursementDetails {
        disbursementDate: Date;
        fundsHeld: boolean;
        settlementAmount: string;
        settlementCurrencyExchangeRate: string;
        settlementCurrencyIsoCode: string;
        success: boolean;
    }

    export enum EscrowStatus {
        hold_pending,
        held,
        release_pending,
        released,
        refunded,
    }

    export interface FacilitatedDetails {
        merchantId: string;
        merchantName: string;
        paymentMethodNonce: string;
    }

    export interface FacilitatorDetails {
        oauthApplicationClientId: string;
        oauthApplicationName: string;
        sourcePaymentMethodToken: string;
    }

    export enum GatewayRejectionReason {
        application_incomplete,
        avs,
        avs_and_cvv,
        cvv,
        duplicate,
        fraud,
        risk_threshold,
        three_d_secure,
        token_issuance,
    }

    export enum PaymentInstrumentType {
        android_pay_card,
        apple_pay_card,
        credit_card,
        masterpass_card,
        paypal_account,
        samsung_pay_card,
        venmo_account,
        visa_checkout_card,
    }

    export enum TransactionProcessorResponseType {
        approved,
        soft_declined,
        hard_declined
    }

    export interface TransactionRiskData {
        decision: string;
        deviceDataCaptured: boolean;
        fraudServiceProvider: string;
        id: string;
    }

    export enum TransactionStatus {
        AuthorizationExpired,
        Authorized,
        Authorizing,
        SettlementPending,
        SettlemnetDeclined,
        Failed,
        GatewayRejected,
        ProcessorDeclined,
        Settled,
        Settling,
        SubmittedForSettlement,
        Voided,
    }

    export interface TransactionStatusHistory {
        amount: string;
        status: TransactionStatus;
        timestamp: Date;
        transactionsource: TransactionSource;
        user: string;
    }

    export enum TransactionSource {
        Api,
        ControlPanel,
        Recurring,
    }

    export interface TransactionThreeDSecureInfo {
        enrolled: string;
        liabilityShiftPossible: boolean;
        liabilityShifted: boolean;
        status: string;
    }

    /**
     * Transaction Line Item
     */

    export interface TransactionLineItem {
        commodityCode?: string;
        description?: string;
        discountAmount?: string;
        kind: string;
        name: string;
        productCode?: string;
        quantity: string;
        taxAmount?: string;
        totalAmount: string;
        unitAmount: string;
        unitOfMeasure?: string;
        unitTaxAmount?: string;
        url?: string;
    }

    export interface TransactionLineItemResponse extends TransactionLineItem {}


    /**
     * Payment Method Sub-Classes
     */

    /**
     * Android Pay Card
     */

    export interface AndroidPayCard extends PaymentMethod {
        bin: string;
        expirationMonth: string;
        expirationYear: string;
        googleTransactionId: string;
        imageUrl: string;
        sourceCardLast4: string;
        sourceCardType: string;
        sourceDescription: string;
        token: string;
        virtualCardLast4: string;
        virtualCardType: string;
    }

    export interface AndroidPayCardResponse extends AndroidPayCard {
        createdAt: Date;
        customerId: string;
        default: boolean;
        subscriptions: Subscription[];
        updatedAt: Date;
    }

    /**
     * Apple Pay Card
     */

    export interface ApplePayCard extends PaymentMethod {
        bin: string;
        cardType: string;
        cardholderName: string;
        expirationMonth: string;
        expirationYear: string;
        imageUrl: string;
        last4: string;
        paymentInsuranceName: string;
        sourceDescription: string;
        token: string;
    }

    export interface ApplePayCardResponse extends ApplePayCard {
        createdAt: Date;
        customerId: string;
        default: boolean;
        expired: boolean;
        subscriptions: Subscription[];
        updatedAt: Date;
    }

    /**
     * Masterpass Card
     */

    export interface MasterpassCard extends PaymentMethod {
        bin: string;
        cardType: string;
        cardholderName: string;
        commercial: Commercial;
        countryOfIssuance: string;
        customerLocation: CustomerLocation;
        debit: Debit;
        durbinRegulated: DurbinRegulated;
        expirationDate: string;
        expirationMonth: string;
        expirationYear: string;
        healthcare: HealthCare;
        imageUrl: string;
        issuingBank: string;
        last4: string;
        maskedNumber: string;
        payroll: Payroll;
        prepaid: Prepaid;
        productId: string;
        token: string;

    }

    export interface MasterpassCardResponse extends MasterpassCard {
        billingAddress: AddressResponse;
        createdAt: Date;
        expired: boolean;
        subscriptions: Subscription[];
        uniqueNumberIdentifier: string;
        updatedAt: Date;
    }

    /**
     * PayPal Account
     */

    export interface PayPalAccount extends PaymentMethod {
        imageUrl: string;
        payerId: string;
        token: string;
    }

    export interface PayPalAccountResponse extends PayPalAccount {
        billingAgreementId: string;
        createdAt: Date;
        customerId: string;
        default: boolean;
        email: string;
        revokedAt: string;
        subscriptions: Subscription[];
        updatedAt: Date;
    }

    /**
     * Samsung Pay Card
     */

    export interface SamsungPayCard extends PaymentMethod {
        bin: string;
        cardType: string;
        cardholderName: string;
        commercial: Commercial;
        countryOfIssuance: string;
        customerLocation: CustomerLocation;
        debit: Debit;
        durbinRegulated: DurbinRegulated;
        expirationDate: string;
        expirationMonth: string;
        expirationYear: string;
        healthcare: HealthCare;
        imageUrl: string;
        issuingBank: string;
        last4: string;
        maskedNumber: string;
        payroll: Payroll;
        prepaid: Prepaid;
        productId: string;
        sourceCardLast4: string;
        token: string;
    }

    export interface SamsungPayCardResponse extends SamsungPayCard {
        billingAddress: AddressResponse;
        createdAt: Date;
        customerId: string;
        expired: boolean;
        subscriptions: Subscription[];
        uniqueNumberIdentifier: string;
        updatedAt: Date;
    }

    /**
     * Venmo Account
     */

    export interface VenmoAccount extends PaymentMethod {
        imageUrl: string;
        sourceDescription: string;
        token: string;
        username: string;
        venmoUserId: string;
    }

    export interface VenmoAccountResponse extends VenmoAccount {
        createdAt: Date;
        customerId: string;
        default: boolean;
        subscriptions: Subscription[];
        updatedAt: Date;
    }

    /**
     * Visa Checkout Card
     */

    export interface VisaCheckoutCard extends PaymentMethod {
        bin: string;
        callId: string;
        cardType: string;
        cardholderName: string;
        commercial: Commercial;
        countryOfIssuance: string;
        customerLocation: CustomerLocation;
        debit: Debit;
        durbinRegulated: DurbinRegulated;
        expirationDate: string;
        expirationMonth: string;
        expirationYear: string;
        healthcare: HealthCare;
        imageUrl: string;
        issuingBank: string;
        last4: string;
        maskedNumber: string;
        payroll: Payroll;
        prepaid: Prepaid;
        productId: string;
        token: string;
    }

    export interface VisaCheckoutCardResponse extends VisaCheckoutCard {
        billingAddress: AddressResponse;
        createdAt: Date;
        customerId: string;
        default: boolean;
        expired: boolean;
        subscriptions: Subscription[];
        uniqueNumberIdentifier: string;
        updatedAt: Date;
    }

    /**
     * Payment Method Enums
     */

    export enum Commercial {
        Yes,
        No,
        Unknown,
    }

    export enum CustomerLocation {
        International,
        US,
    }

    export enum Debit {
        Yes,
        No,
        Unknown,
    }

    export enum DurbinRegulated {
        Yes,
        No,
        Unknown,
    }

    export enum HealthCare {
        Yes,
        No,
        Unknown,
    }

    export enum Payroll {
        Yes,
        No,
        Unknown,
    }

    export enum Prepaid {
        Yes,
        No,
        Unknown,
    }
}
