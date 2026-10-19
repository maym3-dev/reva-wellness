import type { ProseBlock } from "@/components/sections/Prose";

/**
 * Legal pages. Privacy, cookies and website terms are taken from the current
 * REVA privacy policy (last updated 21 June 2024). The booking policy is assembled
 * from the terms published on the current offers page — confirm with the team.
 */
export type LegalPage = { slug: string; title: string; updated?: string; blocks: ProseBlock[] };

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updated: "21 June 2024",
    blocks: [
      {
        "type": "p",
        "text": "Royal Muang Samui Villas respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our services and tell you about your privacy rights and how the law protects you including the Personal Data Protection Act B.E. 2562 (“PDPA“)."
      },
      {
        "type": "p",
        "text": "By using any of our products or services and/or by agreeing to this policy, e.g. in the context of registering for any of our products or services, you understand and acknowledge that we will collect and use personal information as described in this policy."
      },
      {
        "type": "p",
        "text": "This privacy policy is issued on behalf of Royal Muang Samui Villas so when we mention “we”, “us” or “our” in this privacy policy, we are referring to the relevant entity within Royal Muang Samui Villas responsible for processing your data."
      },
      {
        "type": "h2",
        "text": "The data we collect about you"
      },
      {
        "type": "p",
        "text": "Personal data, or personal information, means any information about an individual from which that person can be identified. We collect the following personal data for processing to achieve the purposes as herein with the legal basis provided for in the applicable laws. In addition, we may process your sensitive personal data in accordance with special criteria provided in the applicable laws."
      },
      {
        "type": "ul",
        "items": [
          "Personal information: name, gender, nationality, date of birth, and names of your family members, their date of birth, nationality, identity card information, passport information, etc.",
          "Contact information: address, telephone number, e-mail address, if you get in touch with us online using our online services, we will collect your social media account’s information, etc.",
          "Payment information: credit card number, security code, expiration date, billing address, bank account information and other payment and billing information",
          "Loyalty and referral program: details and partner program affiliation, marketing and analytical data",
          "Accommodation information and travel profiles: dates of arrival and departure from our hotels, the location of the room, smoking/ non-smoking room, type of room and bed requests, preferred newspaper, accommodation and travel preferences, special requests, booking history, and images and videos from you, our photographers, and CCTV cameras in our premises",
          "Feedback: records of your contact with us such as via the phone number, or if you get in touch with us online using our online services, details such as your mobile phone location data, IP address and MAC address, including a history of any communications with us, and analysis of your interaction with us, which helps us to customize offers to you and provide information that we think are of interest or relevance to you",
          "Technical information: IP address, geographic data, cookies data, browser and computer system, application version, language settings and pages that have been shown to you, etc.",
          "Sensitive Personal Information: Upon arrival, we may collect your Identity Card which may have your religious data, and we may collect your health data for providing you with highly individualised services at our resorts, i.e., your food allergies and dietary requirements in relation to food and beverage or health condition and preferences in relation to wellness and spa, and we may collect your vaccination records if required by local law."
        ]
      },
      {
        "type": "p",
        "text": "We limit the information collected in relation to children under 18 years to their name, nationality, and date of birth, which can only be supplied to us by an adult. We kindly request that parent ensures that children do not send us any Personal Data without parental consent, and if such information was sent, please get in touch with us and we will delete such information."
      },
      {
        "type": "p",
        "text": "Regarding the PDPA , personal data means any information relating to an individual, which enables the identification of such individual, whether directly or indirectly."
      },
      {
        "type": "h2",
        "text": "How we collect your personal data"
      },
      {
        "type": "p",
        "text": "This privacy policy aims to give you information on how Royal Muang Samui Villas collects and processes your personal data through your use of this website, and other services provided by Royal Muang Samui Villas from which you are accessing this privacy policy, including any data you may provide when you use our online or offline interactions. Personal Data may be requested or generated in different circumstances, including (but not limited to) the following:"
      },
      {
        "type": "ul",
        "items": [
          "Reservations and purchasing activities: room or table reservations, check-in, and check-out, payment, submission of complaints or requests",
          "Provided by third parties: information collected through marketing partners, tour operators, online reservation systems, and other third parties, which may include information provided by your travel agent, airline, credit card, and other service providers",
          "Marketing and communication activities: newsletter subscription, loyalty program registration, and participation in promotional offers, surveys, competitions, social media and SMS marketing campaigns",
          "Internet activities: connection to any Royal Muang Samui Villas’s sites, online reservations, questionnaires, social media platforms etc."
        ]
      },
      {
        "type": "h2",
        "text": "Information from third parties"
      },
      {
        "type": "p",
        "text": "Sometimes, we receive information about you from third parties. In particular, we may receive information about you from travel agents, tour operators and destination management companies with whom you have direct contact. The information we collect from such third parties includes your contact information and information related to your travel profile."
      },
      {
        "type": "h2",
        "text": "How we use your personal data"
      },
      {
        "type": "p",
        "text": "We use Personal Data to provide you with Services, develop new products and services, and protect Royal Muang Samui Villas and our guests as detailed below."
      },
      {
        "type": "ul",
        "items": [
          "We own, manage, or use your personal information to process and facilitate bookings, product orders and deliveries, provide you with highly-individualized service at our resorts or for delivery to your chosen location, respond to your requests for information, inform you of our products and services and other purposes as set out in this policy.",
          "Disclosure: Data is shared with companies in Royal Muang Samui Villas, third party service providers and professional advisers.",
          "Consent: Where we rely on your consent, such as for marketing our products and services to you, use of cookies, and collection and use of your sensitive personal data, you may withdraw this consent at any time.",
          "Cookies: Our site uses cookies to track visitors using our site, and analyze trends and usage patterns for research and marketing purposes. You are not obliged to accept cookies. More information is set out in the “ Cookies and Similar Tracking Technologies ” section.",
          "Your rights: You have certain rights to your personal information under applicable laws, including a right to object to some of the processing which Royal Muang Samui Villas carries out. More information about your rights, and how to exercise them, is set out in the “ Your Right ” section.",
          "Royal Muang Samui Villas has established and disclosed this Privacy approach to explain any personal data provided by you or collected from or about you. We process your personal data in accordance with the applicable laws relating to personal data protection, including the PDPA ."
        ]
      },
      {
        "type": "h2",
        "text": "Purposes for which we will use your personal data"
      },
      {
        "type": "p",
        "text": "Royal Muang Samui Villas will process your personal data for different purposes. These data processing may be for more than one lawful ground depending on the specific purpose for which we are using your data and the relationship between you and Royal Muang Samui Villas as follows:"
      },
      {
        "type": "ul",
        "items": [
          "To consider entering into an agreement, to take steps as per an application in relation to our products or services, or to enter into an agreement with you in relation to our products or services",
          "To provide products, benefits or services of Royal Muang Samui Villas, to perform contractual obligations, to register for providing services in relation to products and services, payment, to manage of reservations and your stay in our properties, to cater for your request, to monitor your use of services, to receive or deliver the information or documents between you and us including to comply with our internal procedures",
          "To manage our relationship with customers, for example, to communicate with you on any information about our products and services, to manage your complaint, etc. We may personalize content and tailor our digital customer experience and offerings, understand customers’ requirements to develop targeted marketing programs, newsletters, and promotions",
          "To analyze your interests including your spending or service using records in order to evaluate, manage, improve, research, conduct planning, and develop our products, services and sales promotions including our services in hotels, restaurants, and other outlets, to better suit your needs",
          "To inform any information or notifications to you about products or services that you have with us including other products or services of Royal Muang Samui Villas, to inform benefits, sales promotion, marketing activities, any activity and project invitation of Royal Muang Samui Villas and to communicate about such activity and project including to offer our products or services",
          "To conduct our marketing activities, advertise our services, and promote our promotions and offers",
          "To record your information in Royal Muang Samui Villas’s database",
          "To comply with relevant regulations",
          "To manage risks and undertake internal prevention, audit and administration to comply with laws, and to report information to government authorities as required by laws or upon receiving an order or a writ of attachment from the authority",
          "To verify your identity and to control access to the buildings and premises, and to observe, prevent, deter, and (if necessary) investigate unauthorized access to buildings and premises for the purpose of monitoring the security of the buildings and premises of Royal Muang Samui Villas."
        ]
      },
      {
        "type": "h2",
        "text": "Legal basis"
      },
      {
        "type": "p",
        "text": "The legal basis for the processing of your personal data is as follows:"
      },
      {
        "type": "ul",
        "items": [
          "When required by the law, consent shall be obtained;",
          "When the processing activity is necessary for the performance of contractual obligations to perform contractual obligations between you and us;",
          "When the processing activity is required for the pursuit of legitimate interests of Royal Muang Samui Villas; or",
          "When the processing activity is required for compliance with our legal obligations."
        ]
      },
      {
        "type": "p",
        "text": "You have the right to withdraw your consent at any time by the method separately designated by us at the time of obtaining your consent. However, your withdrawal of consent will not affect the legality of processing conducted based on your consent before its withdrawal."
      },
      {
        "type": "p",
        "text": "We will notify you separately if the provision of personal data is a statutory or contractual requirement, or a requirement necessary to enter into a contract, as well as the possible consequences of failure to provide such data."
      },
      {
        "type": "h2",
        "text": "Disclosure of personal data"
      },
      {
        "type": "p",
        "text": "We may share your Personal Data with the following third parties for the purposes listed above:"
      },
      {
        "type": "ul",
        "items": [
          "Royal Muang Samui Villas’s (including its subsidiaries and affiliated companies) employees: to offer you personalized service, we can share your personal data and give access to the appropriate person within Royal Muang Samui Villas including but not limited to hotel staff, reservation staff, IT departments, commercial partners and marketing services;",
          "Business partners and external service providers who provide us with payment related, data management and profiling, analytics, advertising or other services in order to process your bookings, provide information about tailored and individualized services/offers including on social media, and provide you with any information that you have requested: including IT services, marketing services, call centers, banks and credit card issuers, legal services, consultants, and social networking sites;",
          "Local authorities and our professional advisers: where we consider that we need to in order to comply with any law or regulation or as part of internal Royal Muang Samui Villas’s investigations, where we suspect that any criminal offence may have been committed, to protect our rights, property or safety or that of others and in any circumstances where we consider that we are permitted to do so by law or regulation."
        ]
      },
      {
        "type": "p",
        "text": "Royal Muang Samui Villas also reserves the right to transmit any personal data in the event of the sale or transmission of part or all of the company or respective assets. In any case of transmission of personal data to third parties, we will comply with our legal obligations under the applicable laws."
      },
      {
        "type": "h2",
        "text": "Security of personal data"
      },
      {
        "type": "p",
        "text": "Royal Muang Samui Villas has implemented the necessary technical and organizational measures, in compliance with legal requirements, with the aim of protecting Personal Data, and ensuring confidentiality in accordance with the principles laid in this policy."
      },
      {
        "type": "p",
        "text": "In the case where Royal Muang Samui Villas assigns any third party to process your personal information pursuant to the instructions given by or on behalf of Royal Muang Samui Villas, Royal Muang Samui Villas shall appropriately supervise such third party to ensure your personal information protection in accordance with the applicable laws."
      },
      {
        "type": "p",
        "text": "Whenever information is requested on credit cards, this communication is made via secure SSL (Secure Sockets Layer) lines, when you are using a browser which allows SSL, such as Microsoft Internet Explorer or Google Chrome."
      },
      {
        "type": "h2",
        "text": "International transfers"
      },
      {
        "type": "p",
        "text": "As a hospitality company, we may transfer your Personal Data across multiple jurisdictions, insofar as reasonably necessary for the purposes, and in accordance with this Privacy Policy, your Personal Data may be transferred to the following locations:"
      },
      {
        "type": "ul",
        "items": [
          "Countries in which we manage and operate hotels and/or sales offices; and",
          "Countries where our third-party service providers, advisors, and consultants are located, which may be changed from time to time."
        ]
      },
      {
        "type": "p",
        "text": "As a result of the aforementioned sharing and disclosure, in some cases your personal data will be transferred to the recipient company in other countries with an appropriate safeguard by executing with the transferee the standard data protection clauses including Binding Corporate Rules or Data Processing Agreement (if any or whichever is appropriate) pursuant to the PDPA, unless the data transferred country has appropriate data protection standard as prescribed by the Personal Data Protection Committee or we obtain your consent pursuant to the applicable laws."
      },
      {
        "type": "h2",
        "text": "Data retention"
      },
      {
        "type": "p",
        "text": "We will retain your personal data for as long as necessary to fulfill the aforementioned purposes for obtaining and processing your personal data. Specific criteria used to determine our retention periods are the duration we have an ongoing relationship with you, the compliance with applicable laws, the compliance with legal prescription to exercise the rights to legal claims or defend against the rights to legal claims and the necessity of retaining the personal data for other legal or business reasons."
      },
      {
        "type": "p",
        "text": "Please kindly be ensured that the retention of personal data after the expiry date of the retention period will only occur only in the necessary circumstance. When the retention period has ended or the retention of such data is no longer necessary (whichever is applicable), we will destroy or erase such data from our system."
      },
      {
        "type": "p",
        "text": "We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation with respect to our relationship with you."
      },
      {
        "type": "h2",
        "text": "Your rights"
      },
      {
        "type": "p",
        "text": "Under certain circumstances, you have rights under data protection laws in relation to your Personal Data. To exercise any of the following rights please submit a request to the address indicated below:"
      },
      {
        "type": "ul",
        "items": [
          "Request access to your personal data Request access to your personal data (commonly known as a “data subject access request”). This enables you to receive a copy of the personal data we hold about you and to check that we are lawfully processing it.",
          "Request correction of your personal data Request correction of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us.",
          "Request erasure of your personal data Request erasure of your personal data. This enables you to ask us to delete or remove personal data where there is no good reason for us to continue to process it. You also have the right to ask us to delete or remove your personal data where you have successfully exercised your right to object to processing (see below), where we may have processed your information unlawfully or where we are required to erase your personal data to comply with local law. Note, however, that we may not always be able to comply with your request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of your request.",
          "Object to processing of your personal data Object to processing of your personal data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing your personal data for direct marketing purposes. In some cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.",
          "Request restriction of processing your personal data Request restriction of processing of your personal data. This enables you to ask us to suspend the processing of your personal data in the following scenarios: If you want us to establish the data’s accuracy.",
          "Where our use of the data is unlawful, but you do not want us to erase it.",
          "Where you need us to hold the data even if we no longer require it as you need it to establish, exercise or defend legal claims.",
          "You have objected to our use of your data, but we need to verify whether we have overriding legitimate grounds to use it.",
          "Request transfer of your personal data Request the transfer of your personal data to you or to a third party. We will provide to you, or a third party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you.",
          "Right to withdraw consent Withdraw consent at any time where we are relying on consent to process your personal data. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent. If you no longer want to receive marketing-related emails, you may opt out by visiting our [unsubscribe page] or by following the instructions in any email you receive from us."
        ]
      },
      {
        "type": "p",
        "text": "If you intend to exercise any of the aforementioned rights, please inquire using the contact details at the end of this policy. Such requests will be dealt with as quickly as possible. We will request a copy of a valid identification document to confirm your identity, before making any changes."
      },
      {
        "type": "p",
        "text": "If you no longer wish to receive any marketing communications, remain on a mailing list to which you previously subscribed or receive any other communication from us, please follow the unsubscribe link in the relevant communication. We may still contact you for transactional or informational purposes even after you opt out or update your marketing preferences. These include, for example, customer service issues, surveys, or any questions regarding a specific reservation."
      },
      {
        "type": "h2",
        "text": "Amendment"
      },
      {
        "type": "p",
        "text": "We may change this Privacy Policy from time to time, in order to reflect changes in the laws and/or our privacy practices. You can tell when this privacy policy was last updated by looking at the date at the top of the privacy policy. The changes will apply after such notice."
      },
      {
        "type": "h2",
        "text": "Contact us"
      },
      {
        "type": "p",
        "text": "If you have queries about this Privacy Policy, your data and the use of cookies, if you want to exercise your rights or complaint about the use of your data please contact our Data Protection Officer at Email: [email to be confirmed]"
      },
      {
        "type": "p",
        "text": "If you have any queries regarding this Privacy Policy or complaints about our use of your information please contact us at “ [email to be confirmed] ” and we will do our best to deal with your complaint or query as soon as possible."
      },
      {
        "type": "h2",
        "text": "Limitation of liability"
      },
      {
        "type": "p",
        "text": "Please note that the Website may contain typographical errors or other inaccuracies."
      },
      {
        "type": "p",
        "text": "To the fullest extent permissible by applicable law, we do not make any express or implied warranties, representations or endorsements whatsoever with regard to the Website or any information, service or product provided through the Website."
      },
      {
        "type": "p",
        "text": "To the fullest extent permitted by applicable law, we accept no liability for any loss or damage of any nature whatsoever and howsoever arising out of or in connection with the viewing, use or performance of the Website or its contents whether due to inaccuracy, error, omission or any other cause and whether on the part of Royal Muang Samui Villas or our employees, agents or any other person or entity."
      },
      {
        "type": "p",
        "text": "You are responsible for ensuring that your computer system meets all relevant technical specifications necessary to use the Website and is compatible with the Website."
      },
      {
        "type": "h2",
        "text": "Modifications/alterations to the Website"
      },
      {
        "type": "p",
        "text": "We reserve the right to make changes or corrections, alter, suspend or discontinue any aspect of the Website, the content or services or products available through it, including your access to it. Unless explicitly stated to the contrary, any new features including new content, our provision of new products or services, or resources shall be subject to these terms and conditions."
      },
      {
        "type": "h2",
        "text": "Cookies and Similar Tracking Technologies"
      },
      {
        "type": "p",
        "text": "Our site uses cookies (small text files stored in your web browser) and similar technologies such as web beacons (small, clear picture files used to follow your movements on our website) (collectively, “ Cookies “). These collect information that tells us how you use our website and web-related services. We use these to compile statistical reports on website activity."
      },
      {
        "type": "p",
        "text": "This helps us make our website relevant to your interests and needs. We may use a persistent cookie (a cookie that stays linked to your browser) to record your details so we can recognize you if you visit our website again."
      },
      {
        "type": "p",
        "text": "The type of cookies we use on this site include:"
      },
      {
        "type": "ul",
        "items": [
          "Usability Cookies These cookies are used to provide additional functionality to the site and may affect your experience if they are turned off. They are used to allow enhancement widgets for live chat to provide customer support or alert widgets drawing your attention to updates and exclusive offers. These cookies may track your customer journey to personalise the support and messaging given."
        ]
      },
      {
        "type": "p",
        "text": "We may also use the information collected from our use of cookies to estimate our audience size, analyze trends and general usage patterns of our site, optimize our site, and for other research and marketing purposes. This is statistical information and does not identify any individual."
      },
      {
        "type": "p",
        "text": "You are not obliged to accept cookies. If you wish, you can set your browser to notify you before you receive a cookie and you can also set your browser to refuse to receive or send all cookies. For more information on cookies, visit www.allaboutcookies.org where you can also find information on how to turn them off by users."
      },
      {
        "type": "p",
        "text": "If you wish to block the cookies please visit:"
      },
      {
        "type": "ul",
        "items": [
          "Google AdWords – http://www.google.com/settings/ads",
          "Facebook Pixel – You may disable any of these cookies or similar technologies via your browser settings.",
          "Twitter Advertising – You may disable tailored advertisements via your Twitter settings by visiting the “Promoted content” and “Personalization” sections.",
          "Google Analytics – You may disable any of these cookies via your browser settings or by downloading a browser add-in: https://tools.google.com/dlpage/gaoptout ."
        ]
      },
      {
        "type": "p",
        "text": "You may disable any of these cookies via your browser settings or change your cookies settings."
      },
      {
        "type": "p",
        "text": "By using our site without disabling cookies via your browser settings you are consenting to our use of cookies and similar technologies as described in this Policy."
      },
      {
        "type": "p",
        "text": "Please note that our advertisers and third-party partners may also use cookies. These parties may use so-called “ third party ” cookies so that they can track your response to their adverts and/or identify you on any other website that you visit which also contains their adverts. Please refer to their Privacy Policy for further details. More information on cookies and similar technologies is available at the website www.allaboutcookies.org ."
      },
      {
        "type": "p",
        "text": "This Policy applies to the use of our website only. When you link to third party websites via our Website, the personal information protection shall be in accordance with the Privacy Policy of such websites which are not related to Royal Muang Samui Villas."
      }
    ],
  },
  {
    slug: "cookies-policy",
    title: "Cookies Policy",
    updated: "21 June 2024",
    blocks: [
      {
        "type": "h2",
        "text": "Cookies and Similar Tracking Technologies"
      },
      {
        "type": "p",
        "text": "Our site uses cookies (small text files stored in your web browser) and similar technologies such as web beacons (small, clear picture files used to follow your movements on our website) (collectively, “ Cookies “). These collect information that tells us how you use our website and web-related services. We use these to compile statistical reports on website activity."
      },
      {
        "type": "p",
        "text": "This helps us make our website relevant to your interests and needs. We may use a persistent cookie (a cookie that stays linked to your browser) to record your details so we can recognize you if you visit our website again."
      },
      {
        "type": "p",
        "text": "The type of cookies we use on this site include:"
      },
      {
        "type": "ul",
        "items": [
          "Usability Cookies These cookies are used to provide additional functionality to the site and may affect your experience if they are turned off. They are used to allow enhancement widgets for live chat to provide customer support or alert widgets drawing your attention to updates and exclusive offers. These cookies may track your customer journey to personalise the support and messaging given."
        ]
      },
      {
        "type": "p",
        "text": "We may also use the information collected from our use of cookies to estimate our audience size, analyze trends and general usage patterns of our site, optimize our site, and for other research and marketing purposes. This is statistical information and does not identify any individual."
      },
      {
        "type": "p",
        "text": "You are not obliged to accept cookies. If you wish, you can set your browser to notify you before you receive a cookie and you can also set your browser to refuse to receive or send all cookies. For more information on cookies, visit www.allaboutcookies.org where you can also find information on how to turn them off by users."
      },
      {
        "type": "p",
        "text": "If you wish to block the cookies please visit:"
      },
      {
        "type": "ul",
        "items": [
          "Google AdWords – http://www.google.com/settings/ads",
          "Facebook Pixel – You may disable any of these cookies or similar technologies via your browser settings.",
          "Twitter Advertising – You may disable tailored advertisements via your Twitter settings by visiting the “Promoted content” and “Personalization” sections.",
          "Google Analytics – You may disable any of these cookies via your browser settings or by downloading a browser add-in: https://tools.google.com/dlpage/gaoptout ."
        ]
      },
      {
        "type": "p",
        "text": "You may disable any of these cookies via your browser settings or change your cookies settings."
      },
      {
        "type": "p",
        "text": "By using our site without disabling cookies via your browser settings you are consenting to our use of cookies and similar technologies as described in this Policy."
      },
      {
        "type": "p",
        "text": "Please note that our advertisers and third-party partners may also use cookies. These parties may use so-called “ third party ” cookies so that they can track your response to their adverts and/or identify you on any other website that you visit which also contains their adverts. Please refer to their Privacy Policy for further details. More information on cookies and similar technologies is available at the website www.allaboutcookies.org ."
      },
      {
        "type": "p",
        "text": "This Policy applies to the use of our website only. When you link to third party websites via our Website, the personal information protection shall be in accordance with the Privacy Policy of such websites which are not related to Royal Muang Samui Villas."
      }
    ],
  },
  {
    slug: "booking-policy",
    title: "Booking Policy",
    blocks: [
      { type: "p", text: "The following terms apply to offers booked directly through our official website. Individual offers may carry additional conditions, shown with each offer." },
      { type: "h2", text: "Payment" },
      { type: "ul", items: ["Pre-payment of the full amount (100%) of the total room cost may be required at the time of reservation, depending on the rate.", "Direct-booking benefits are only valid for reservations made through the REVA website."] },
      { type: "h2", text: "Cancellation and no-show" },
      { type: "ul", items: ["Non-refundable rates cannot be cancelled, modified or refunded.", "A 100% penalty for the entire booking period applies to no-shows and early departures on non-refundable rates."] },
      { type: "h2", text: "Bank transfers" },
      { type: "p", text: "Payments by wire transfer must only be made to the official bank account provided by our reservations team, and the transaction slip sent to reservations immediately after payment." },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    updated: "21 June 2024",
    blocks: [
      {
        "type": "h2",
        "text": "Limitation of liability"
      },
      {
        "type": "p",
        "text": "Please note that the Website may contain typographical errors or other inaccuracies."
      },
      {
        "type": "p",
        "text": "To the fullest extent permissible by applicable law, we do not make any express or implied warranties, representations or endorsements whatsoever with regard to the Website or any information, service or product provided through the Website."
      },
      {
        "type": "p",
        "text": "To the fullest extent permitted by applicable law, we accept no liability for any loss or damage of any nature whatsoever and howsoever arising out of or in connection with the viewing, use or performance of the Website or its contents whether due to inaccuracy, error, omission or any other cause and whether on the part of Royal Muang Samui Villas or our employees, agents or any other person or entity."
      },
      {
        "type": "p",
        "text": "You are responsible for ensuring that your computer system meets all relevant technical specifications necessary to use the Website and is compatible with the Website."
      },
      {
        "type": "h2",
        "text": "Modifications/alterations to the Website"
      },
      {
        "type": "p",
        "text": "We reserve the right to make changes or corrections, alter, suspend or discontinue any aspect of the Website, the content or services or products available through it, including your access to it. Unless explicitly stated to the contrary, any new features including new content, our provision of new products or services, or resources shall be subject to these terms and conditions."
      }
    ],
  },
];

export const getLegalPage = (slug: string) => legalPages.find((p) => p.slug === slug);
