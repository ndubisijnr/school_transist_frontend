import {QueryTransactionsRecentResponseData} from "@/model/response/transaction/QueryTransactionsRecentResponse";
import {StringUtil} from "@/utility/StringUtil";
import {TimeUtil} from "@/utility/TimeUtil";
import {ReadCategoriesResponseData} from "@/model/response/billsPayments/ReadCategoriesResponse";
import {MobileAndBankConfigResponse} from "@/model/response/mobileConfig/MobileAndBankConfigResponse";

interface transactionReceiptTemplateProps {
    transaction: QueryTransactionsRecentResponseData;
    billerGroup?: ReadCategoriesResponseData | null,
    mobileBankConfig: MobileAndBankConfigResponse
}

export const transactionReceiptTemplate = (transactionReceiptTemplateProps: transactionReceiptTemplateProps) => {

    console.log("transactionReceiptTemplateProps.transaction", transactionReceiptTemplateProps.transaction)
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link href="https://fonts.cdnfonts.com/css/br-firma" rel="stylesheet"/>
    
    <style>
        :root {
            /* height: max-content; */
        }

        * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            font-family: "BR Firma";
            print-color-adjust:exact !important;
        }

        .fullPage {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .paddedContainer {
            padding: 20px;
            padding-bottom: 0px;
            gap: 20px;
            display: flex;
            flex-direction: column;
        }

        .bg-color {
            background-color: rgba(245, 245, 245, 1);
        }

        .alt-bg-color {
            background-color: rgba(245, 245, 245, 0.5);
        }

        .receiptHeader {
            width: 100%;
            display: flex;
            gap: 20px;
            justify-content: space-between;
            background-color: #0D0D12;
            padding: 18px;
        }

        .logoAndNameDiv {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .headerSubject {
            justify-content: center;
            align-items: center;
            display: flex;
            text-transform: capitalize;
            color: white;
            font-size: 18px;
            font-weight: bold;
        }

        .amountDiv {
            width: 100%;
            padding-top: 18px;
            padding-bottom: 18px;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 8px;
        }

        .svg-container {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .receiptBodyDiv {
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            overflow: hidden;
        }

        .receiptBodyItem {
            display: flex;
            gap: 20px;
            flex-direction: row;
            padding: 8px;
            justify-content: space-between;
        }

        .receiptBodyKey {
            color: #666d80;
            text-align: left;
            font-family: "BR Firma";
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
        }

        .receiptBodyValue {
            color: #1a1b25;
            text-align: right;
            font-family: "BR Firma";
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
        }

    </style>
   
</head>
<body>
<div class="fullPage">
    <div class="receiptHeader">
        <div class="logoAndNameDiv">
        <img width="186" height="60"
         style="width: 186px; height: 60px;" 
         src="${transactionReceiptTemplateProps.mobileBankConfig?.mobileConfigData?.mobileConfigurationBankLogo}" alt="" >
        </div>
        <div class="headerSubject">
            Transaction Receipt
        </div>
    </div>

    <div class="paddedContainer">
        <div class="amountDiv bg-color">
            <p class="receiptBodyKey" style="
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 12px;
        ">
                TRANSACTION SUCCESSFUL
            </p>
            <p class="receiptBodyValue"
               style="
            font-size: 25px;
        ">
                NGN ${StringUtil.formatAmountDp(transactionReceiptTemplateProps.transaction.amount)}
            </p>
            <p class="receiptBodyKey" style="
            font-size: 12px;
            text-transform: capitalize;
        ">
             ${StringUtil.timeFMM(transactionReceiptTemplateProps?.transaction?.eventDate)}
            </p>
        </div>

        <div class="receiptBodyDiv">
            <div class="receiptBodyItem bg-color">
                <p class="receiptBodyKey">Beneficiary Name</p>
                <p class="receiptBodyValue">${
        transactionReceiptTemplateProps?.transaction?.counterPartyAccountName?.toLowerCase().includes("vas") ?
            StringUtil.toTitleCase(transactionReceiptTemplateProps?.transaction?.narration?.split("|")[0].replaceAll("_", " ") || "")
            : transactionReceiptTemplateProps?.transaction?.counterPartyAccountName.toLowerCase().includes("vtu") ? StringUtil.toTitleCase(transactionReceiptTemplateProps?.transaction?.counterPartyAccountNumber || "")
                : StringUtil.toTitleCase(transactionReceiptTemplateProps?.transaction?.counterPartyAccountName)
    }</p>
            </div>
            <div class="receiptBodyItem alt-bg-color">
                <p class="receiptBodyKey">${transactionReceiptTemplateProps?.transaction?.counterPartyAccountName?.toLowerCase().includes("vas") || transactionReceiptTemplateProps?.transaction?.counterPartyAccountName.toLowerCase().includes("vtu") ? "Biller Type" : "Beneficiary Bank Name"}</p>
                <p class="receiptBodyValue">
                    ${transactionReceiptTemplateProps?.transaction?.counterPartyAccountName?.toLowerCase().includes("vas") || transactionReceiptTemplateProps?.transaction?.counterPartyAccountName.toLowerCase().includes("vtu") ? StringUtil.toTitleCase(transactionReceiptTemplateProps?.billerGroup?.categoryName || "") :
        StringUtil.toTitleCase(transactionReceiptTemplateProps?.transaction?.counterPartyBank)}
                    </p> 
            </div>
            <div class="receiptBodyItem bg-color">
                <p class="receiptBodyKey">Beneficiary Account Number</p>
                <p class="receiptBodyValue">${
        transactionReceiptTemplateProps?.transaction?.counterPartyAccountName?.toLowerCase().includes("vas") ?
            transactionReceiptTemplateProps?.transaction?.narration?.split("|")[1] : transactionReceiptTemplateProps?.transaction?.counterPartyAccountName.toLowerCase().includes("vtu") ? transactionReceiptTemplateProps?.transaction?.counterPartyAccountNumber
                : transactionReceiptTemplateProps?.transaction?.counterPartyAccountNumber
    }</p>
            </div>
            <div class="receiptBodyItem alt-bg-color">
                <p class="receiptBodyKey">Sender's Name</p>
                <p class="receiptBodyValue">
                    ${StringUtil.toTitleCase(transactionReceiptTemplateProps?.transaction?.accountName || "")}</p>
            </div>
            <div class="receiptBodyItem bg-color">
                <p class="receiptBodyKey">Transaction Status</p>
                <p class="receiptBodyValue">Successful</p>
            </div>
            <div class="receiptBodyItem alt-bg-color">
                <p class="receiptBodyKey">Amount Sent</p>
                <p class="receiptBodyValue">NGN 
     ${StringUtil.formatAmountDp(transactionReceiptTemplateProps.transaction.amount)}</p>
            </div>
             <div class="receiptBodyItem alt-bg-color">
                <p class="receiptBodyKey">Narration</p>
                <p class="receiptBodyValue">
                    ${StringUtil.toTitleCase(transactionReceiptTemplateProps?.transaction?.narration?.replaceAll("_", " ") || "")}</p>
            </div>
            <div class="receiptBodyItem bg-color">
                <p class="receiptBodyKey">Transaction Date</p>
                <p class="receiptBodyValue">${StringUtil.timeFMM(
        transactionReceiptTemplateProps?.transaction?.eventDate
    )}</p>
            </div>
            <div class="receiptBodyItem alt-bg-color">
                <p class="receiptBodyKey">Transaction Reference</p>
                <p class="receiptBodyValue">${transactionReceiptTemplateProps.transaction.paymentReference}</p>
            </div>
     
        </div>

        <p class="receiptBodyKey" style="
              font-size: 14px;
              text-align: center;
              line-height: 20px;
              font-weight: 300;
        ">
            For complaints regarding this transaction <br>
            contact our support: ${transactionReceiptTemplateProps.mobileBankConfig?.bankData?.bankSupportEmail}
        </p>

        <div class="svg-container">
            <svg width="100%" height="70" viewBox="0 0 100% 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6858_57414)">
                    <rect width="100%" height="70" rx="12" fill="#1A1B25"/>
                    <g opacity="0.5">
                        <mask
                                id="path-2-outside-1_6858_57414"
                                maskUnits="userSpaceOnUse"
                                x="323"
                                y="-109"
                                width="238"
                                height="239"
                                fill="black"
                        >
                            <rect fill="white" x="323" y="-109" width="238" height="239"/>
                            <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M324 -103.039C324 -105.779 326.221 -108 328.961 -108H497.532C532.032 -108 560 -80.0322 560 -45.5321C560 -42.7924 557.779 -40.5715 555.039 -40.5715H386.468C351.968 -40.5715 324 -68.5393 324 -103.039ZM324 39.1542C324 41.8939 326.221 44.1149 328.961 44.1149H497.532C532.032 44.1149 560 16.1471 560 -18.353C560 -21.0927 557.779 -23.3137 555.039 -23.3137H386.468C351.968 -23.3137 324 4.65414 324 39.1542ZM430.103 61.3726C427.364 61.3726 425.143 63.5935 425.143 66.3332C425.143 100.833 453.11 128.801 487.61 128.801H555.039C557.779 128.801 560 126.58 560 123.84C560 89.3404 532.032 61.3726 497.532 61.3726H430.103Z"
                            />
                        </mask>
                        <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M324 -103.039C324 -105.779 326.221 -108 328.961 -108H497.532C532.032 -108 560 -80.0322 560 -45.5321C560 -42.7924 557.779 -40.5715 555.039 -40.5715H386.468C351.968 -40.5715 324 -68.5393 324 -103.039ZM324 39.1542C324 41.8939 326.221 44.1149 328.961 44.1149H497.532C532.032 44.1149 560 16.1471 560 -18.353C560 -21.0927 557.779 -23.3137 555.039 -23.3137H386.468C351.968 -23.3137 324 4.65414 324 39.1542ZM430.103 61.3726C427.364 61.3726 425.143 63.5935 425.143 66.3332C425.143 100.833 453.11 128.801 487.61 128.801H555.039C557.779 128.801 560 126.58 560 123.84C560 89.3404 532.032 61.3726 497.532 61.3726H430.103Z"
                                fill="white"
                                fill-opacity="0.09"
                        />
                        <path
                                d="M328.961 -108.431C325.983 -108.431 323.569 -106.017 323.569 -103.039H324.431C324.431 -105.541 326.459 -107.569 328.961 -107.569V-108.431ZM497.532 -108.431H328.961V-107.569H497.532V-108.431ZM560.431 -45.5321C560.431 -80.2705 532.27 -108.431 497.532 -108.431V-107.569C531.794 -107.569 559.569 -79.7939 559.569 -45.5321H560.431ZM555.039 -40.14C558.017 -40.14 560.431 -42.5541 560.431 -45.5321H559.569C559.569 -43.0307 557.541 -41.0029 555.039 -41.0029V-40.14ZM386.468 -40.14H555.039V-41.0029H386.468V-40.14ZM323.569 -103.039C323.569 -68.301 351.73 -40.14 386.468 -40.14V-41.0029C352.206 -41.0029 324.431 -68.7775 324.431 -103.039H323.569ZM328.961 43.6834C326.459 43.6834 324.431 41.6556 324.431 39.1542H323.569C323.569 42.1322 325.983 44.5463 328.961 44.5463V43.6834ZM497.532 43.6834H328.961V44.5463H497.532V43.6834ZM559.569 -18.353C559.569 15.9088 531.794 43.6834 497.532 43.6834V44.5463C532.27 44.5463 560.431 16.3853 560.431 -18.353H559.569ZM555.039 -22.8822C557.541 -22.8822 559.569 -20.8544 559.569 -18.353H560.431C560.431 -21.331 558.017 -23.7451 555.039 -23.7451V-22.8822ZM386.468 -22.8822H555.039V-23.7451H386.468V-22.8822ZM324.431 39.1542C324.431 4.89242 352.206 -22.8822 386.468 -22.8822V-23.7451C351.73 -23.7451 323.569 4.41586 323.569 39.1542H324.431ZM425.574 66.3332C425.574 63.8318 427.602 61.804 430.103 61.804V60.9411C427.125 60.9411 424.711 63.3553 424.711 66.3332H425.574ZM487.61 128.37C453.349 128.37 425.574 100.595 425.574 66.3332H424.711C424.711 101.072 452.872 129.233 487.61 129.233V128.37ZM555.039 128.37H487.61V129.233H555.039V128.37ZM559.568 123.84C559.568 126.342 557.54 128.37 555.039 128.37V129.233C558.017 129.233 560.431 126.818 560.431 123.84H559.568ZM497.532 61.804C531.794 61.804 559.568 89.5786 559.568 123.84H560.431C560.431 89.1021 532.27 60.9411 497.532 60.9411V61.804ZM430.103 61.804H497.532V60.9411H430.103V61.804Z"
                                fill="url(#paint0_linear_6858_57414)"
                                mask="url(#path-2-outside-1_6858_57414)"
                        />
                    </g>
                    <g opacity="0.5">
                        <mask
                                id="path-4-outside-2_6858_57414"
                                maskUnits="userSpaceOnUse"
                                x="-70"
                                y="10"
                                width="238"
                                height="239"
                                fill="black"
                        >
                            <rect fill="white" x="-70" y="10" width="238" height="239"/>
                            <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M-69 15.9607C-69 13.221 -66.779 11 -64.0393 11H104.532C139.032 11 167 38.9678 167 73.4679C167 76.2076 164.779 78.4285 162.039 78.4285H-6.53214C-41.0322 78.4285 -69 50.4607 -69 15.9607ZM-69 158.154C-69 160.894 -66.779 163.115 -64.0393 163.115H104.532C139.032 163.115 167 135.147 167 100.647C167 97.9073 164.779 95.6863 162.039 95.6863H-6.53214C-41.0322 95.6863 -69 123.654 -69 158.154ZM37.1033 180.373C34.3636 180.373 32.1426 182.594 32.1426 185.333C32.1426 219.833 60.1104 247.801 94.6104 247.801H162.039C164.779 247.801 167 245.58 167 242.84C167 208.34 139.032 180.373 104.532 180.373H37.1033Z"
                            />
                        </mask>
                        <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M-69 15.9607C-69 13.221 -66.779 11 -64.0393 11H104.532C139.032 11 167 38.9678 167 73.4679C167 76.2076 164.779 78.4285 162.039 78.4285H-6.53214C-41.0322 78.4285 -69 50.4607 -69 15.9607ZM-69 158.154C-69 160.894 -66.779 163.115 -64.0393 163.115H104.532C139.032 163.115 167 135.147 167 100.647C167 97.9073 164.779 95.6863 162.039 95.6863H-6.53214C-41.0322 95.6863 -69 123.654 -69 158.154ZM37.1033 180.373C34.3636 180.373 32.1426 182.594 32.1426 185.333C32.1426 219.833 60.1104 247.801 94.6104 247.801H162.039C164.779 247.801 167 245.58 167 242.84C167 208.34 139.032 180.373 104.532 180.373H37.1033Z"
                                fill="white"
                                fill-opacity="0.09"
                        />
                        <path
                                d="M-64.0393 10.5686C-67.0173 10.5686 -69.4314 12.9827 -69.4314 15.9607H-68.5686C-68.5686 13.4593 -66.5407 11.4314 -64.0393 11.4314V10.5686ZM104.532 10.5686H-64.0393V11.4314H104.532V10.5686ZM167.431 73.4679C167.431 38.7295 139.27 10.5686 104.532 10.5686V11.4314C138.794 11.4314 166.569 39.2061 166.569 73.4679H167.431ZM162.039 78.86C165.017 78.86 167.431 76.4459 167.431 73.4679H166.569C166.569 75.9693 164.541 77.9971 162.039 77.9971V78.86ZM-6.53214 78.86H162.039V77.9971H-6.53214V78.86ZM-69.4314 15.9607C-69.4314 50.699 -41.2705 78.86 -6.53214 78.86V77.9971C-40.7939 77.9971 -68.5686 50.2225 -68.5686 15.9607H-69.4314ZM-64.0393 162.683C-66.5407 162.683 -68.5686 160.656 -68.5686 158.154H-69.4314C-69.4314 161.132 -67.0173 163.546 -64.0393 163.546V162.683ZM104.532 162.683H-64.0393V163.546H104.532V162.683ZM166.569 100.647C166.569 134.909 138.794 162.683 104.532 162.683V163.546C139.27 163.546 167.431 135.385 167.431 100.647H166.569ZM162.039 96.1178C164.541 96.1178 166.569 98.1456 166.569 100.647H167.431C167.431 97.669 165.017 95.2549 162.039 95.2549V96.1178ZM-6.53214 96.1178H162.039V95.2549H-6.53214V96.1178ZM-68.5686 158.154C-68.5686 123.892 -40.7939 96.1178 -6.53214 96.1178V95.2549C-41.2705 95.2549 -69.4314 123.416 -69.4314 158.154H-68.5686ZM32.574 185.333C32.574 182.832 34.6018 180.804 37.1033 180.804V179.941C34.1253 179.941 31.7111 182.355 31.7111 185.333H32.574ZM94.6104 247.37C60.3486 247.37 32.574 219.595 32.574 185.333H31.7111C31.7111 220.072 59.8721 248.233 94.6104 248.233V247.37ZM162.039 247.37H94.6104V248.233H162.039V247.37ZM166.568 242.84C166.568 245.342 164.54 247.37 162.039 247.37V248.233C165.017 248.233 167.431 245.818 167.431 242.84H166.568ZM104.532 180.804C138.794 180.804 166.568 208.579 166.568 242.84H167.431C167.431 208.102 139.27 179.941 104.532 179.941V180.804ZM37.1033 180.804H104.532V179.941H37.1033V180.804Z"
                                fill="url(#paint1_linear_6858_57414)"
                                mask="url(#path-4-outside-2_6858_57414)"
                        />
                    </g>
                </g>
                <defs>
                    <linearGradient
                            id="paint0_linear_6858_57414"
                            x1="259.499"
                            y1="-229.451"
                            x2="571.649"
                            y2="176.753"
                            gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="white" stop-opacity="0.33"/>
                        <stop offset="1" stop-color="white" stop-opacity="0"/>
                    </linearGradient>
                   
                    <linearGradient
                            id="paint1_linear_6858_57414"
                            x1="-133.501"
                            y1="-110.451"
                            x2="178.649"
                            y2="295.753"
                            gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="white" stop-opacity="0.33"/>
                        <stop offset="1" stop-color="white" stop-opacity="0"/>
                    </linearGradient>
                    <clipPath id="clip0_6858_57414">
                        <rect width="100%" height="99" rx="12" fill="white"/>
                    </clipPath>
                </defs>
            </svg>

            <p
                    style="
                        position: absolute;
                        color: white;
                        top: 0px;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-family: BR Firma;
                        /*font-weight: bold;*/
                        font-size: 16px;
                    "
            >
                With
                <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12.6499 16.684C10.3103 19.0257 8.99609 22.2004 8.99609 25.5105C8.99609 28.8207 10.3103 31.9954 12.6499 34.337L14.4079 36.102L31.9959 53.755L49.5829 36.102L51.3419 34.337C53.6815 31.9954 54.9957 28.8207 54.9957 25.5105C54.9957 22.2004 53.6815 19.0257 51.3419 16.684C50.1911 15.5219 48.8215 14.5994 47.312 13.9698C45.8026 13.3403 44.1834 13.0161 42.5479 13.0161C40.9124 13.0161 39.2932 13.3403 37.7838 13.9698C36.2743 14.5994 34.9047 15.5219 33.7539 16.684L31.9959 18.449L30.2369 16.684C29.0862 15.5221 27.7165 14.5997 26.2072 13.9702C24.6979 13.3407 23.0787 13.0166 21.4434 13.0166C19.8081 13.0166 18.1889 13.3407 16.6796 13.9702C15.1702 14.5997 13.8006 15.5221 12.6499 16.684Z"
                          fill="#FF143A"/>
                    <path opacity="0.4"
                          d="M14.1403 29.7699C13.3946 28.4782 13.002 27.013 13.002 25.5214C13.002 24.0299 13.3946 22.5646 14.1403 21.2729C14.8862 19.9809 15.959 18.908 17.251 18.1622C18.5429 17.4163 20.0085 17.0237 21.5003 17.0239"
                          stroke="white" stroke-width="1.999" stroke-linecap="round" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M21.4437 13.0149C19.8084 13.0145 18.1891 13.3382 16.6797 13.9675C15.1702 14.5967 13.8005 15.519 12.6497 16.6809C12.1564 17.1825 11.7058 17.7244 11.3027 18.3009C11.3227 18.2809 11.3227 18.2779 11.3347 18.2659C12.3851 17.2054 13.6353 16.3635 15.013 15.789C16.3907 15.2144 17.8685 14.9186 19.3612 14.9186C20.8539 14.9186 22.3318 15.2144 23.7095 15.789C25.0872 16.3635 26.3373 17.2054 27.3877 18.2659L29.7597 20.6579L31.3647 19.0449C31.5707 18.8379 31.7877 18.6509 32.0047 18.4639L30.2397 16.6799C29.089 15.5178 27.7193 14.5954 26.2099 13.9659C24.7004 13.3365 23.0812 13.0126 21.4457 13.0129L21.4437 13.0149ZM42.5467 13.0149C39.9547 13.0149 37.3707 13.8409 35.1817 15.4669C37.1656 14.8294 39.2872 14.7535 41.3115 15.2477C43.3359 15.7419 45.1839 16.7869 46.6507 18.2669C48.786 20.404 49.9854 23.3014 49.9854 26.3224C49.9854 29.3434 48.786 32.2409 46.6507 34.3779L45.0457 35.9909L29.6717 51.4229L31.9947 53.7549L49.5827 36.0999L51.3397 34.3339C53.6791 31.992 54.9932 28.8172 54.9932 25.5069C54.9932 22.1967 53.6791 19.0219 51.3397 16.6799C50.1891 15.5181 48.8195 14.5959 47.3102 13.9667C45.801 13.3374 44.1819 13.0136 42.5467 13.0139V13.0149Z"
                          fill="#D30045"/>
                </svg>
                from the ${transactionReceiptTemplateProps.mobileBankConfig.bankData?.bankName} team
            </p>
        </div>
    </div>
</div>
</body>
</html>
    
    `;
};

//       <div class="receiptBodyItem bg-color">
//                 <p class="receiptBodyKey">Session ID</p>
//                 <p class="receiptBodyValue">${transactionReceiptTemplateProps.transaction.paymentReference}</p>
//             </div>