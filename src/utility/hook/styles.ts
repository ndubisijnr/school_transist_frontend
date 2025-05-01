import {Platform, StatusBar, StyleSheet} from 'react-native';

// Styles
export const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor:'#fff'

    },
    sectionContainer:{
       padding:16
    },
    emptyStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    receiptIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    emptyStateTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
        color: '#222',
    },
    emptyStateDescription: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        lineHeight: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
        padding:10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tabSelector: {
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        overflow: 'hidden',
    },
    tabButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F5F5F5',
    },
    activeTab: {
        backgroundColor: '#4285F4',
    },
    tabText: {
        color: '#757575',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 10,
        marginBottom: 16,
        elevation: 0,
    },
    cardLabel: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 8,

    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F0FE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successIconContainer: {
        backgroundColor: '#E6F4EA',
    },
    failedIconContainer: {
        backgroundColor: '#FCECED',
    },
    conversionIconContainer: {
        backgroundColor: '#EDE7F6',
    },
    positiveChange: {
        color: '#34A853',
        marginTop: 8,
        fontSize: 12,
    },
    negativeChange: {
        color: '#EA4335',
        marginTop: 8,
        fontSize: 12,
    },
    chartCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 0,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    placeholderChart: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
        borderRadius: 8,
    },
    placeholderText: {
        color: '#757575',
        marginTop: 8,
    },
    analysisCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 0,
    },
    analysisRow: {
        marginTop: 8,
        marginBottom: 4,
    },
    analysisLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#424242',
    },
    analysisItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    analysisItemLabel: {
        color: '#757575',
    },
    analysisItemValue: {
        fontWeight: '500',
    },

    // Company Detail Styles
    closeButton: {
        alignSelf: 'flex-end',
        padding: 8,
    },
    companyHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoPlaceholder: {
        fontSize: 12,
        textAlign: 'center',
        color: '#757575',
    },
    companyName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    companySlogan: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 16,
        fontStyle: 'italic',
    },
    ratingContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingLabel: {
        fontSize: 14,
        marginBottom: 8,
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    communityRating: {
        fontSize: 14,
        color: '#757575',
    },
    likesContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    likeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    likeCount: {
        marginLeft: 4,
        color: '#757575',
    },
    companyLocation: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 16,
    },
    subscribeButton: {
        backgroundColor: '#4285F4',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
        marginBottom: 8,
    },
    subscribeButtonText: {
        color: '#FFFFFF',
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginBottom: 16,
    },
    branchCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    branchInfo: {
        flex: 1,
    },
    branchName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    branchManager: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 2,
    },
    branchPhone: {
        fontSize: 14,
        color: '#757575',
    },
    branchSubscribeButton: {
        backgroundColor: '#4285F4',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
    },
    branchSubscribeText: {
        color: '#FFFFFF',
        fontWeight: '500',
    },
    coverageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    coverageTag: {
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    coverageText: {
        fontSize: 14,
        color: '#424242',
    },
    aboutText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#424242',
        marginBottom: 16,
    },
    featuresList: {
        marginBottom: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureText: {
        fontSize: 14,
        color: '#424242',
        marginLeft: 8,
    },

    // Dispatch Services Styles
    pageTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    servicesContainer: {
        flexDirection: 'row',
        gap:10,
        // justifyContent: 'space-between',
        paddingRight: 16,
    },
    serviceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        margin: 5,
        // width: 260,
        alignItems: 'center',
        elevation: 2,
        position: 'relative',
    },
    serviceLogoContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        position: 'relative',
    },
    serviceLogo: {
        fontSize: 10,
        textAlign: 'center',
        color: '#757575',
    },
    serviceNearTag: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: '#E8F0FE',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    serviceNearText: {
        fontSize: 10,
        color: '#4285F4',
    },
    serviceName: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    serviceRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingValue: {
        marginLeft: 4,
        fontSize: 12,
        color: '#757575',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    dispatchTab: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginRight: 8,
    },
    activeDispatchTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#4285F4',
    },
    dispatchTabText: {
        color: '#757575',
    },
    activeDispatchTabText: {
        color: '#4285F4',
        fontWeight: '500',
    },
    dispatchItemCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    dispatchItemInfo: {
        marginBottom: 12,
    },
    dispatchCustomerName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    dispatchLocation: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 2,
    },
    dispatchPhone: {
        fontSize: 14,
        color: '#757575',
    },
    dispatchStatusContainer: {
        alignItems: 'flex-end',
        position: 'absolute',
        top: 16,
        right: 16,
    },
    dispatchStatusPending: {
        backgroundColor: '#FFF8E1',
        color: '#F9A825',
        fontSize: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    dispatchActionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    detailsButton: {
        backgroundColor: '#E8F0FE',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    detailsButtonText: {
        color: '#4285F4',
    },
    approveButton: {
        backgroundColor: '#E6F4EA',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    approveButtonText: {
        color: '#34A853',
    },

    // Business Dashboard Styles
    businessHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    businessLogoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    businessLogo: {
        fontSize: 12,
        textAlign: 'center',
        color: '#757575',
    },
    businessName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    balanceContainer: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 8,
    },
    balanceAmount: {
        fontSize: 18,
        fontWeight: '500',
    },
    paymentTabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    paymentTab: {
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginRight: 8,
    },
    activePaymentTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#4285F4',
    },
    paymentTabText: {
        color: '#757575',
    },
    activePaymentTabText: {
        color: '#4285F4',
        fontWeight: '500',
    },
    transactionSummaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    transactionSummaryContent: {
        flex: 1,
    },
    transactionSummaryLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    transactionSuccessIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E6F4EA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionFailedIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FCECED',
        justifyContent: 'center',
        alignItems: 'center',
    },


    header: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    logoText: {
        fontSize: 16,
        fontWeight: '500',
    },
    logoSubtext: {
        fontSize: 16,
    },
    closeIcon: {
        position: 'absolute',
        right: 15,
        top: 20,
    },
    titleSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },

    tagline: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 5,
    },
    ratingSection: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    rateText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },

    likeCounter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    counterText: {
        marginLeft: 5,
        color: '#555',
    },
    headquarters: {
        fontSize: 14,
        color: '#555',
        marginVertical: 10,
    },

    branchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
    },

    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 5,
    },
    branchSubscribe: {
        backgroundColor: '#1a73e8',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 4,
    },
    locationsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    locationItem: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        margin: 4,
    },
    locationText: {
        fontSize: 13,
        color: '#333',
    },

});