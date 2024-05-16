

window.addEventListener('DOMContentLoaded', () => {
  console.log("CONTENT LOADED")

  var screenWidth = window.innerWidth;
  var screenHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  var trigger = document.querySelector("df-messenger-chat-bubble");
  var chat = trigger.shadowRoot.querySelector("df-messenger-chat");
  var userInput = chat.shadowRoot.querySelector("df-messenger-user-input");
  var messageList = chat.shadowRoot.querySelector("df-messenger-message-list");
  var messengerBotUtterance = messageList.shadowRoot?.querySelector(".entry.bot:last-child df-messenger-utterance");
  var messengerFeedback = messengerBotUtterance?.shadowRoot?.querySelector('df-messenger-feedback');
  var citations = messengerBotUtterance?.shadowRoot?.querySelector("df-citations");
  var agentHandoverOffered = false;
  document.querySelector('#myButton').addEventListener('click', openDFMessenger);


  function openDFMessenger() {
    const dfMessengerBubble = document.querySelector('df-messenger-chat-bubble');
    dfMessengerBubble.openChat();
  };

  /*Custom style elements*/
  var styleUserInput = document.createElement('style');
  var messageListStyle = document.createElement('style');
  var chatbubbleStyle = document.createElement('style');
  var htmlMessageStyle = document.createElement('style');
  var botInnerMessageStyle = document.createElement('style');
  var userInnerMessageStyle = document.createElement('style');
  var feedbackThumbsStyle = document.createElement('style');
  var sourceStyle = document.createElement('style');
  var handoverButtonStyle = document.createElement('style');
  var titlebarStyle = document.createElement('style');
  var titlebarWrapperStyle = document.createElement('style');
  var titlebar = document.createElement('style');
  var messageWrapperStyle = document.createElement('style');
  chatbubbleStyle.textContent = `
    .bubble{position:absolute !important; bottom:105px;right:900px}
    .container{position:fixed !important; bottom:0px;right:0px }
    .chat-wrapper.expanded{bottom:0px !important; animation: .25s ease forwards slideInFromRight; border-top-right-radius:0px !important}
    .chat-wrapper.hidden{animation: 1s ease-out 0s 1 slideOutToRight;}
    
    
    @keyframes slideInFromRight {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(0);
      }
    }

    @keyframes slideOutToRight {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(100%);
      }
    }
    @media (prefers-reduced-motion:no-preference) {
      .chat-wrapper.hidden {
    animation: slideOutToRight .25s ease forwards
      }
    }
  `

  styleUserInput.textContent = `
    .input-box-wrapper{background-color:#FFFFFF !important;align-items:normal !important}

    .tmpInput{background-color:blue; position:relative}
    .input-wrapper{border:1px solid rgba(0, 0, 0, 0.44); border-radius:4px 8px 8px 4px}
    #send-icon-button{background-color:#4E0174 !important;padding:14px !important; border-radius:8px}
    #send-icon-button:active{background-color:#8C07D0 !important}
    #send-icon-button:hover{background-color:#6D02A3 !important; cursor:pointer}
    #send-icon-button #send-icon{display:none}
    #send-icon-button:before{display:contents;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.02658 1.43248C1.20615 1.27832 1.45956 1.24412 1.67357 1.34516L14.6826 7.48697C14.8925 7.58608 15.0264 7.7974 15.0264 8.02954C15.0264 8.26169 14.8925 8.473 14.6826 8.57211L1.67356 14.7139C1.45955 14.8149 1.20614 14.7807 1.02658 14.6266C0.84701 14.4724 0.774836 14.2271 0.842308 14.0003L2.61825 8.02954L0.842307 2.05879C0.774836 1.83195 0.84701 1.58664 1.02658 1.43248ZM3.69174 8.62954L2.37525 13.0556L11.7502 8.62954H3.69174ZM11.7502 7.42954H3.69174L2.37525 3.00345L11.7502 7.42954Z' fill='white'/%3E%3C/svg%3E")}
    .send-icon-button-wrapper{background-color:#4E0174; border-top-right-radius:8px; border-bottom-right-radius:8px; min-height:48px; height:auto!important}
    .input-container{padding:16px !important; border-left:1px solid rgba(0, 0, 0, 0.1) !important; border-bottom-right-radius:0px !important;position:fixed !important; bottom:0px;right:0px;width:-webkit-fill-available!important};
  `
  messageListStyle.textContent = `
    .df-welcome-container{margin:auto;text-align:center;color:rgba(0, 0, 0, 0.62)}
    .df-welcome-container .df-welcome-icon{background-color:rgba(0, 0, 0, 0.05);border-radius:50%;height:48px;width:48px;margin:auto;background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M10.4596 17.121L7.9441 16.0077L10.3908 14.9393C10.3908 14.9393 10.3909 14.9393 10.3909 14.9393C11.53 14.442 12.4431 13.5318 12.9407 12.3876C12.9407 12.3875 12.9408 12.3874 12.9408 12.3873L14.0023 9.95289L15.0642 12.3882C15.561 13.5277 16.4706 14.4415 17.6144 14.9396C17.6145 14.9396 17.6146 14.9397 17.6147 14.9397L20.0494 16.0026L17.6139 17.0659C17.6138 17.0659 17.6138 17.0659 17.6138 17.0659C16.475 17.563 15.562 18.473 15.0643 19.6168C15.0643 19.6169 15.0643 19.6169 15.0642 19.6169C15.0641 19.6173 15.064 19.6176 15.0638 19.6179L14.0088 22.0365L12.9985 19.6876C12.9984 19.6873 12.9983 19.687 12.9981 19.6868C12.5067 18.5409 11.5997 17.6247 10.4603 17.1213C10.4603 17.1213 10.4602 17.1212 10.4602 17.1212C10.46 17.1211 10.4598 17.121 10.4596 17.121Z' stroke='%23990AE3' stroke-width='2'/%3E%3Cpath d='M9.89047 6.83371L8.00695 6.01142C7.55143 5.81309 7.18864 5.44891 6.99044 4.99427L6.16865 3.1096C6.1049 2.96347 5.89742 2.96347 5.83367 3.1096L5.01188 4.99427C4.81368 5.45007 4.44972 5.81309 3.99536 6.01142L2.10953 6.83487C1.96349 6.89866 1.96349 7.10511 2.10953 7.1689L4.02782 8.01787C4.48218 8.21851 4.84381 8.58385 5.0397 9.04081L5.83483 10.8895C5.89742 11.0368 6.10606 11.0368 6.16981 10.8895L6.99044 9.00834C7.18864 8.55254 7.55259 8.18952 8.00695 7.99119L9.89047 7.1689C10.0365 7.10511 10.0365 6.8975 9.89047 6.83371Z' fill='%23990AE3'/%3E%3Cpath d='M13.9452 1.91686L13.0035 1.50571C12.7757 1.40655 12.5943 1.22446 12.4952 0.997137L12.0843 0.0548005C12.0524 -0.0182668 11.9487 -0.0182668 11.9168 0.0548005L11.5059 0.997137C11.4068 1.22504 11.2249 1.40655 10.9977 1.50571L10.0548 1.91744C9.98174 1.94933 9.98174 2.05255 10.0548 2.08445L11.0139 2.50893C11.2411 2.60926 11.4219 2.79193 11.5198 3.02041L11.9174 3.94476C11.9487 4.01841 12.053 4.01841 12.0849 3.94476L12.4952 3.00417C12.5943 2.77627 12.7763 2.59476 13.0035 2.4956L13.9452 2.08445C14.0183 2.05255 14.0183 1.94875 13.9452 1.91686Z' fill='%23990AE3'/%3E%3C/svg%3E");background-repeat:no-repeat; background-position:center center;}
    .df-welcome-title-container .df-welcome-title{font-size:20px;font-weight:700;text-align:center;line-height:25px;color:rgba(0, 0, 0, 0.8); margin-top:16px;margin-bottom:16px}
    .df-welcome-container .df-welcome-title-container .df-welcome-subtitle{color:rgba(0, 0, 0, 0.62) !important;font-size:14px;}
    .message-list-wrapper{height:calc(100% - 80px) !important}
  `
  htmlMessageStyle.textContent = `
    df-html-message{width:calc(100% - 24px) !important;max-width:calc(100% - 24px) !important;}
    .message-stack.mid df-card.mid{width:100%}
  `
  botInnerMessageStyle.textContent = `
    .bot-message .source-header{font-weight:500 !important; font-size:14px !important; line-height:14px !important;margin-top:16px;margin-bottom:8px}
    .bot-message p{margin-top:0px;margin-bottom:12px}
    .bot-message p a{color:#6D02A3 !important}
    .bot-message p a:hover{color:#4E0174 !important}
    .bot-message p a:active{color:#29003E !important}
    .bot-message p a:focus{border:2px solid #B12DF4 !important}
  `
  userInnerMessageStyle.textContent = `
    df-text-message{width:calc(100% - 25px) !important; max-width:calc(100% - 25px) !important}
  `
  feedbackThumbsStyle.textContent = `
    .feedback .thumb:hover{fill:#4E0174};
    .feedback-box{display:none !important}
  `
  sourceStyle.textContent = `
    .bot-message .df-source:last-of-type a{display:none !important}
  `
  handoverButtonStyle.textContent = `
    #dfButtonWrapper{justify-content:center};
    #dfButtonWrapper .text.word-wrap{font-weight:500 !important}
  `
  titlebarWrapperStyle.textContent = `
    .titlebar-wrapper{border-top-right-radius:0px !important; position:sticky!important; top:0}
  `
  titlebar.textContent = `
    df-messenger-titlebar{position:sticky !important; top:0}
  `
  messageWrapperStyle.textContent = `
    df-messenger-message-list{display:block !important}
  `
  chat.shadowRoot.appendChild(messageWrapperStyle)
  var styleElement = null;
  var createStyleElement = (content) => {
    var style = document.createElement('style');
    style.innerText = content;
    return style;
  };
  var updateStyles = () => {
    if (styleElement) {
      document.head.removeChild(styleElement);
    }
  screenWidth = window.innerWidth;
  screenHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  var commonStyles = `
  df-messenger {
    z-index: 999;
    position: fixed;
    --df-messenger-titlebar-background: #FFFFFF;
    --df-messenger-titlebar-title-font-weight:700;
    --df-messenger-titlebar-title-font-size:20px;
    --df-messenger-chat-background: #FFFFFF;
    --df-messenger-chat-padding:20px;
    --df-messenger-font-family:Telia Sans;
    bottom:0px;
    top:0px;
    right:0px
  }
  df-messenger-chat-bubble {
    --df-messenger-chat-bubble-background:transparent;
    --df-messenger-default-border-color:#FFFFFF;
    --df-messenger-default-border:1px solid #FFFFFF;
    --df-messenger-chat-bubble-background: #FFFFFF;
    --df-messenger-chat-bubble-icon-size:40px;
    --df-messenger-chat-window-height: ${screenHeight}px;
    --df-messenger-chat-background: #FFFFFF;
    --df-messenger-chat-scroll-button-display:block;
    --df-messenger-chat-scroll-button-background-color:rgba(43, 43, 43, 1);
    --df-messenger-chat-scroll-button-padding:16px;
    --df-messenger-chat-scroll-button-text-display:none;
    --df-messenger-message-bot-background: #F5F5FA;
    --df-messenger-message-bot-font-color: rgba(0, 0, 0, 0.8);
    --df-messenger-message-bot-font-weight: 400;
    --df-messenger-message-font-size: 16px;
    --df-messenger-message-user-background: #FAF0FF;
    --df-messenger-message-user-font-color: rgba(0, 0, 0, 0.8);
    --df-messenger-message-user-font-weight: 400;
    --df-messenger-message-border-radius: 8px;
    --df-messenger-send-icon-color: #FFFFFF;
    --df-messenger-send-icon-color-disabled:#FFFFFF;
    --df-messenger-input-padding: 0px;
    --df-messenger-input-font-size: 16px;
    --df-messenger-input-box-padding: 12px;
    --df-messenger-input-background:#fff;
    --df-messenger-input-border-bottom:1px solid rgba(0, 0, 0, 0.44);
    --df-messenger-message-feedback-icon-font-color: #6D02A3;
    --df-messenger-message-feedback-icon-font-color-active:#29003E;
    --df-messenger-citations-font-color: #6D02A3;
    --df-messenger-citations-border-color: #6D02A3;
    --df-messenger-citations-border-radius: 50px;
    --df-messenger-citations-font-size: 16px;
    --df-messenger-citations-message-font-size: 14px;
    --df-messenger-message-user-writing-image-width:250px;
    --df-messenger-focus-color:#6D02A3;
    --df-messenger-titlebar-padding:5px 15px;
    --df-messenger-titlebar-font-color:rgba(0, 0, 0, 0.8);
    --df-messenger-titlebar-border-bottom:rgba(0, 0, 0, 0.1) 1px solid;
    --df-messenger-citations-background:#F5F5FA;
    --df-messenger-send-icon-offset-y:1px;
    --df-messenger-card-background:#4E0174;
    --df-messenger-button-border-radius:50px;
    --df-messenger-button-font-color:#FFFFFF;
    --df-messenger-button-text-align:center;
    --df-messenger-button-font-size:16px;
    --df-messenger-link-visited-font-color:#6D02A3;
    --df-messenger-link-hover-font-color:#4E0174;
  }
  `;

  const mobileStyles = `
    df-messenger {
      --df-messenger-internal-chat-bubble-size-offset: 0px;
    }
    df-messenger-chat-bubble {
      --df-messenger-chat-window-width:${innerWidth}px;
      --df-messenger-default-chat-border-radius:0px;
      --df-messenger-message-padding:16px;
    }
  `;

  const desktopStyles = `
    df-messenger {
      --df-messenger-chat-border-radius:16px;
      --df-messenger-chat-border: rgba(0, 0, 0, 0.1) solid 1px;
      --df-messenger-internal-chat-bubble-size-offset: 50px;
      --df-messenger-link-visited-font-color:#6D02A3;
    }
    df-messenger-chat-bubble {
      --df-messenger-chat-window-width:480px;
      --df-messenger-message-padding:16px;
      
    }
  `;
/*--df-messenger-input-inner-padding:0px 40px 0px 0px;*/
  styleElement =createStyleElement(commonStyles + (screenWidth <= 600 ? mobileStyles : desktopStyles))
  document.head.appendChild(styleElement);
  trigger.shadowRoot.appendChild(chatbubbleStyle);
};
updateStyles();
window.addEventListener('resize', function checkHeight(){
  var height = window.visualViewport ? window.visualViewport.height : window.innerHeight
  if(height > 600){
    updateStyles()
  }
});
  chat.querySelector('df-messenger-titlebar').shadowRoot.appendChild(titlebarWrapperStyle)
  chat.appendChild(titlebar)
  if (screenWidth <= 600) {
    titlebarStyle.textContent = `
      df-messenger-titlebar{
        position:fixed !important;
        top:0;
        left:0;
        width:100%;
        z-index:2
      }
    `
    chat.appendChild(titlebarStyle);
  }
  /*End custom style elements*/



  /*Welcome message*/
  var welcomeContainer = document.createElement('div');
  welcomeContainer.setAttribute('class', 'df-welcome-container');

  var welcomeIcon = document.createElement('div');
  welcomeIcon.setAttribute('class', 'df-welcome-icon');

  var welcomeTitleContainer = document.createElement('div');
  welcomeTitleContainer.setAttribute('class', 'df-welcome-title-container');
  var welcomeTitle = document.createElement('h3');
  welcomeTitle.setAttribute('class', 'df-welcome-title');
  welcomeTitle.innerText = "Fråga mig om tv och streaming.";

  var welcomeSubtitle = document.createElement('span');
  welcomeSubtitle.setAttribute('class', 'df-welcome-subtitle');
  welcomeSubtitle.innerText = "Tänk på att inte dela dina personuppgifter när du använder vår AI.";

  welcomeContainer.appendChild(welcomeIcon)
  welcomeTitleContainer.appendChild(welcomeTitle)
  welcomeContainer.appendChild(welcomeTitleContainer)
  welcomeContainer.appendChild(welcomeSubtitle)
  /*End welcome message*/

  window.addEventListener('df-chat-open-changed', (event) => {
    if (event.detail.isOpen === true) {
      console.log(event.detail.isOpen)
      setTimeout(focusOnInput, 500)
    }
  });
  function focusOnInput() {
    //userInput.shadowRoot.querySelector('.input-content-wrapper textarea.input-box').focus();
   //userInput.shadowRoot.querySelector('.input-content-wrapper textarea.input-box').setSelectionRange(0,0)
    var tmpInput = document.createElement('input')
    tmpInput.setAttribute('class','tmpInput')
    console.log('klickad')
    userInput.shadowRoot.appendChild(tmpInput)
    setTimeout(clickTMP,100)
  }
  function clickTMP(){
    console.log('klickad2', userInput.shadowRoot.querySelector('.tmpInput'))
    userInput.shadowRoot.querySelector('.tmpInput').click();
    console.log('klickad3')
  }

  var messageArea = chat.shadowRoot.querySelector('.message-list-wrapper df-messenger-message-list');
  var messageList = messageArea.shadowRoot.querySelector('.message-list-wrapper');
  var messages = messageList.querySelector('#message-list .content');
  var userInput = chat.shadowRoot.querySelector('df-messenger-user-input');
  userInput.shadowRoot.appendChild(styleUserInput);

  if (messages.firstChild) {
    messages.insertBefore(welcomeContainer, messages.firstChild);
  } else {
    messages.appendChild(welcomeContainer);
  }
  document.body.appendChild(htmlMessageStyle);
  messageArea.shadowRoot.appendChild(messageListStyle);

  checkElementsExist();


  window.addEventListener('df-request-sent', (event) => {
    setTimeout(addUserUtteranceStyle, 100);
  });

  window.addEventListener('df-response-received', (event) => {
    setTimeout(addBotUtteranceStyle, 100);
  });




  function addUserUtteranceStyle() {
    var userUtterances = messageList.querySelectorAll('.content .user');
    if (userUtterances) {
      var userInnerMessageStyleClone = userInnerMessageStyle.cloneNode(true);
      var utterance;
      if (userUtterances.length > 0) {
        var lastUserUtterance = userUtterances[userUtterances.length - 1];
        utterance = lastUserUtterance.querySelector('df-messenger-utterance');
        utterance.shadowRoot.appendChild(userInnerMessageStyleClone);
      } else {
        utterance = messageList.shadowRoot.querySelector('.content .user df-messenger-utterance');
        utterance.shadowRoot.appendChild(userInnerMessageStyleClone);
      }
      utterance.shadowRoot.appendChild(userInnerMessageStyle);
    }
  }

  function addBotUtteranceStyle() {
    console.log("add bot utterance", messageList)
    var utterance = messageList.querySelector('.bot:last-child df-messenger-utterance');
    var botUtterance = utterance?.shadowRoot.querySelector("df-html-message");
    var htmlMessageStyleClone = htmlMessageStyle.cloneNode(true);
    var botInnerMessageStyleClone = botInnerMessageStyle.cloneNode(true);
    botUtterance?.appendChild(htmlMessageStyleClone);
    botUtterance?.shadowRoot.appendChild(botInnerMessageStyleClone);
    if (utterance.shadowRoot.querySelector('.message-stack.mid df-card')) {
      var handoverButton = utterance.shadowRoot.querySelector('.message-stack.mid df-card').shadowRoot.querySelector('df-button')
      var handoverButtonStyleClone = handoverButtonStyle.cloneNode(true);
      handoverButton.shadowRoot.appendChild(handoverButtonStyleClone)
    }
    addFeedbackStyle(utterance);
    checkSources(botUtterance);
    checkIfBulletlist(botUtterance)
  }
  function checkSources(botUtterance) {
    var source1 = botUtterance?.shadowRoot?.querySelector('.bot-message p a')
    var source2 = botUtterance?.shadowRoot?.querySelector('.bot-message p:last-of-type a')
    if (source1 && source1.innerText.includes('$sys.func.GET')) {
      let str = source1?.innerText;
      let jsonStr = str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1);
      let obj = JSON.parse(jsonStr);
      let title = obj.title;

      source1.innerText = title;
      source1.setAttribute('href', obj.uri)
      source1.setAttribute('target', '_blank')

    }
    if (source2?.innerText.includes('$sys.func.GET')) {
      let str = source2.innerText;
      let jsonStr = str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1);
      let obj = JSON.parse(jsonStr);
      let title = obj.title;

      source2.innerText = title;
      source2.setAttribute('href', obj.uri)
      source2.setAttribute('target', '_blank')
    }
    if (source1?.innerText === source2?.innerText) {
      //var sourceStyleClone = sourceStyle.cloneNode(true);
      //botUtterance?.shadowRoot.appendChild(sourceStyleClone);
      source2?.remove();
    }
    source1?.setAttribute("target", "_blank");
    source2?.setAttribute("target", "_blank")
    if (source1 && source1.href.includes('https://www.telia.se/produkt')) {
      source2?.remove()
    }
  }
  function addFeedbackStyle(utterance) {
    if (utterance.shadowRoot.querySelector('df-messenger-feedback')) {
      var feedback = utterance.shadowRoot.querySelector('df-messenger-feedback');
      feedback.shadowRoot.querySelector('.feedback').appendChild(feedbackThumbsStyle);
    }
  }
  function checkIfBulletlist(response) {
    console.log(response)
    var botMessage = response?.shadowRoot.querySelector('.bot-message span span')
    var messageText = botMessage?.innerText

    if(messageText && messageText?.includes(' * ')){
      console.log('* found')
      messageText = messageText.replace(/ \* /g, "\n•")
      botMessage.innerText = messageText;
    }

  }
  function checkElementsExist() {
    /*Applies styling to existing conversation after reload of page*/
    allUserUtterances();
    allBotUtterances();
    checkAllSources();
    checkCustomElement()
  }

  function allUserUtterances() {
    console.log(messageList)
    var userUtterances = messageList.querySelectorAll('.content .user');
    userUtterances?.forEach(utterance => {
      var userUtterance = utterance.querySelector('df-messenger-utterance');
      var userInnerMessageStyleClone = userInnerMessageStyle.cloneNode(true);
      userUtterance.shadowRoot.appendChild(userInnerMessageStyleClone);
    });
  }

  function allBotUtterances() {
    var botUtterances = messageList.querySelectorAll('.content .bot');
    botUtterances?.forEach(utterance => {
      var botUtterance = utterance.querySelector('df-messenger-utterance');
      var htmlMessageStyleClone = htmlMessageStyle.cloneNode(true);
      var botInnerMessageStyleClone = botInnerMessageStyle.cloneNode(true);
      botUtterance.shadowRoot.appendChild(htmlMessageStyleClone);
      botUtterance?.shadowRoot.querySelector('df-html-message')?.shadowRoot.appendChild(botInnerMessageStyleClone);
      if (botUtterance.shadowRoot.querySelector('.message-stack.mid df-card')) {
        var handoverButton = botUtterance.shadowRoot?.querySelector('.message-stack.mid df-card')?.shadowRoot.querySelector('df-button');
        var handoverButtonStyleClone = handoverButtonStyle.cloneNode(true);
        handoverButton.shadowRoot.appendChild(handoverButtonStyleClone)
      }
    });
  }
  function checkAllSources() {
    var botUtterances = messageList?.shadowRoot?.querySelectorAll('.content .bot');
    botUtterances?.forEach(utterance => {
      var botUtterance = utterance.querySelector('df-messenger-utterance').shadowRoot.querySelector("df-html-message");
      var source1 = botUtterance?.shadowRoot.querySelector('.bot-message p.df-source a')
      var source2 = botUtterance?.shadowRoot.querySelector('.bot-message p.df-source:last-of-type a')
      if (source1?.innerText.includes('$sys.func.GET')) {
        let str = source1.innerText;
        let jsonStr = str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1);
        let obj = JSON.parse(jsonStr);
        let title = obj.title;

        source1.innerText = title;
        source1.setAttribute('href', obj.uri)
        source1.setAttribute('target', '_blank')

      }
      if (source2?.innerText.includes('$sys.func.GET')) {
        let str = source2.innerText;
        let jsonStr = str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1);
        let obj = JSON.parse(jsonStr);
        let title = obj.title;

        source2.innerText = title;
        source2.setAttribute('href', obj.uri)
        source2.setAttribute('target', '_blank')
      }
      if (source1?.innerText === source2?.innerText) {
        var sourceStyleClone = sourceStyle.cloneNode(true);
        botUtterance?.shadowRoot.appendChild(sourceStyleClone);
      }
    });
  }
  function checkCustomElement() {
    var botUtterances = messageList?.shadowRoot?.querySelectorAll('.content .bot');
    botUtterances?.forEach(utterance => {
      var botUtterance = utterance.querySelector('df-messenger-utterance').shadowRoot.querySelector("df-custom-template");

      if (botUtterance) {
        agentHandoverOffered = true
        var element;
        element = new CustomElementAgentHandover
        botUtterance.appendChild(element)
      }
    })
    agentHandoverOffered = false;
  }
  class CustomElementAgentHandover extends HTMLElement {
    constructor() {
      super();
      this.dfPayload = null;
      this.dfResponseId = null;
      this.renderRoot = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
      var buttonStyle = document.createElement('style');
      var div = document.createElement('div');
      var button = document.createElement('button');
      var span = document.createElement('span');

      div.setAttribute('class', 'agent-handover-container');
      button.setAttribute('class', 'handover-button');
      span.setAttribute('class', 'handover-text');
      buttonStyle.innerText = `
        .handover-button{background-color:#4E0174; color:#FFFFFF;font-size:16px;border-radius:50px;padding:16px;font-weight:500;border:none;width:100%;font-family:"Telia Sans";cursor:pointer}
        .handover-button:hover{background-color:#6D02A3 !important}
        .handover-text:before{content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.41675 2.33337C1.41675 1.64302 1.97639 1.08337 2.66675 1.08337H8.00008C8.60482 1.08337 9.10926 1.51281 9.22508 2.08337H13.6667C14.3571 2.08337 14.9167 2.64302 14.9167 3.33337V5.00004C14.9167 5.6904 14.3571 6.25004 13.6667 6.25004H12.575L11.4126 7.41252C11.1848 7.64033 10.8154 7.64033 10.5876 7.41252C10.3598 7.18471 10.3598 6.81537 10.5876 6.58756L11.9209 5.25423C12.0303 5.14483 12.1787 5.08337 12.3334 5.08337H13.6667C13.7128 5.08337 13.7501 5.04606 13.7501 5.00004V3.33337C13.7501 3.28735 13.7128 3.25004 13.6667 3.25004H9.25008V5.00004C9.25008 5.04606 9.28739 5.08337 9.33341 5.08337H10.0001C10.3222 5.08337 10.5834 5.34454 10.5834 5.66671C10.5834 5.98887 10.3222 6.25004 10.0001 6.25004H9.33341C8.72867 6.25004 8.22424 5.8206 8.10842 5.25004H6.66675C6.34458 5.25004 6.08341 4.98887 6.08341 4.66671C6.08341 4.34454 6.34458 4.08337 6.66675 4.08337H8.08341V2.33337C8.08341 2.28735 8.04611 2.25004 8.00008 2.25004H2.66675C2.62072 2.25004 2.58341 2.28735 2.58341 2.33337V4.00004C2.58341 4.04606 2.62072 4.08337 2.66675 4.08337H4.33341C4.48812 4.08337 4.6365 4.14483 4.74589 4.25423L6.74589 6.25423C6.9737 6.48203 6.9737 6.85138 6.74589 7.07919C6.51809 7.30699 6.14874 7.30699 5.92094 7.07919L4.09179 5.25004H2.66675C1.97639 5.25004 1.41675 4.6904 1.41675 4.00004V2.33337ZM5.00008 8.91671C4.35505 8.91671 3.82048 9.44768 3.82048 10.1172C3.82048 10.4386 3.94378 10.7284 4.14446 10.9435C4.36096 11.1756 4.6644 11.3176 5.00008 11.3176C5.33577 11.3176 5.6392 11.1756 5.85571 10.9435C6.05639 10.7284 6.17969 10.4386 6.17969 10.1172C6.17969 9.44768 5.64511 8.91671 5.00008 8.91671ZM2.65381 10.1172C2.65381 8.81632 3.69783 7.75004 5.00008 7.75004C6.30234 7.75004 7.34635 8.81632 7.34635 10.1172C7.34635 10.4313 7.28549 10.7317 7.17496 11.0065C7.41958 11.1116 7.70136 11.2688 7.92012 11.5003C7.94746 11.5293 7.97414 11.559 8.00012 11.5896C8.10873 11.4615 8.22663 11.3519 8.34849 11.2587C8.50436 11.1395 8.66389 11.0492 8.81502 10.9808C8.71094 10.7129 8.65381 10.4215 8.65381 10.1172C8.65381 8.81632 9.69783 7.75004 11.0001 7.75004C12.3023 7.75004 13.3464 8.81632 13.3464 10.1172C13.3464 10.4313 13.2855 10.7317 13.175 11.0065C13.4196 11.1116 13.7014 11.2688 13.9201 11.5003C14.4603 12.072 14.7416 12.9688 14.49 14.2863C14.4185 14.661 14.09 14.9167 13.7255 14.9167H8.27467C8.1788 14.9167 8.08615 14.8991 8.00023 14.8667C7.91376 14.8992 7.82087 14.9167 7.7255 14.9167H2.27467C1.90314 14.9167 1.57989 14.6523 1.50973 14.2842C1.36451 13.5222 1.39521 12.8965 1.56138 12.386C1.72947 11.8695 2.02502 11.506 2.34849 11.2587C2.50436 11.1395 2.66389 11.0492 2.81502 10.9808C2.71094 10.7129 2.65381 10.4215 2.65381 10.1172ZM3.52948 11.9617C3.38707 11.9985 3.21342 12.0659 3.05722 12.1854C2.90606 12.301 2.7599 12.4732 2.67077 12.747C2.59611 12.9764 2.5544 13.2996 2.60689 13.75H7.39339C7.40818 13.6238 7.41562 13.5073 7.4169 13.3998C7.41671 13.3775 7.41671 13.3555 7.4169 13.3335C7.41022 12.7738 7.23202 12.4708 7.0721 12.3016C6.97326 12.197 6.77994 12.0945 6.55067 12.0155C6.51431 12.003 6.47906 11.9917 6.44565 11.9817C6.04804 12.2957 5.546 12.4843 5.00008 12.4843C4.44265 12.4843 3.93095 12.2877 3.52948 11.9617ZM8.60689 13.75H13.3934C13.491 12.9163 13.2679 12.5088 13.0721 12.3016C12.9733 12.197 12.7799 12.0945 12.5507 12.0155C12.5143 12.003 12.4791 11.9917 12.4457 11.9817C12.048 12.2957 11.546 12.4843 11.0001 12.4843C10.4426 12.4843 9.93095 12.2877 9.52948 11.9617C9.38707 11.9985 9.21342 12.0659 9.05722 12.1854C8.90606 12.301 8.7599 12.4732 8.67077 12.747C8.59611 12.9764 8.5544 13.2996 8.60689 13.75ZM11.0001 8.91671C10.355 8.91671 9.82048 9.44768 9.82048 10.1172C9.82048 10.4386 9.94378 10.7284 10.1445 10.9435C10.361 11.1756 10.6644 11.3176 11.0001 11.3176C11.3358 11.3176 11.6392 11.1756 11.8557 10.9435C12.0564 10.7284 12.1797 10.4386 12.1797 10.1172C12.1797 9.44768 11.6451 8.91671 11.0001 8.91671Z' fill='white'/%3E%3C/svg%3E");margin-right:8px}
      `
      /* buttonStyle.innerText = `
        .handover-button{background-color:${this.dfPayload.backgroundColor}; color:${this.dfPayload.color};font-size:${this.dfPayload.fontSize};border-radius:${this.dfPayload.radius};padding:${this.dfPayload.padding};font-weight:${this.dfPayload.fontWeight};border:${this.dfPayload.border};width:${this.dfPayload.width};font-family:${this.dfPayload.fontFamily};cursor:pointer}
        .handover-icon{content:${this.dfPayload.iconURI}}
      `*/
      //button.innerText = this.dfPayload.text;
      span.innerText = "Kontakta en expert";
      if (agentHandoverOffered === true) {
        var botUtterances = messageList.shadowRoot.querySelectorAll('.content .bot df-messenger-utterance');

        botUtterances.forEach(utterance => {
          var customTemplate = utterance.shadowRoot.querySelector("df-custom-template");
          if (customTemplate) {
            var whisbi = customTemplate.querySelector('agent-handover-whisbi');
            button.appendChild(span);
            div.appendChild(button);
            div.appendChild(buttonStyle);
            if (whisbi?.shadowRoot) {
              whisbi?.shadowRoot?.appendChild(div);
              customTemplate.shadowRoot.appendChild(whisbi);
            }
            console.log('I agent handover offered')
            button.addEventListener("click", function openWhisbi() {
              const openWhisbiEvent = new CustomEvent("ace-open-whisbi", {});
              window.dispatchEvent(openWhisbiEvent);
              const dfMessengerBubble = document.querySelector('df-messenger-chat-bubble');
              dfMessengerBubble.closeChat();
            })
          }

        });
      } else {
        console.log('openWhisbe button Created')
        button.appendChild(span);
        div.appendChild(button)
        div.appendChild(buttonStyle)
        this.renderRoot.appendChild(div);
        button.addEventListener("click", function openWhisbi() {
          const openWhisbiEvent = new CustomEvent("ace-open-whisbi", {});
          window.dispatchEvent(openWhisbiEvent);
          const dfMessengerBubble = document.querySelector('df-messenger-chat-bubble');
          dfMessengerBubble.closeChat();
        })
      }
    }
  }

  (function () {
    customElements.define('agent-handover-whisbi', CustomElementAgentHandover);
  })();
});
