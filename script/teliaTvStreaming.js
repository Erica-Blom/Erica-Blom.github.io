window.addEventListener('DOMContentLoaded', () => {

  var screenWidth = window.innerWidth;
  var screenHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  var trigger = document.querySelector("df-messenger-chat-bubble");
  var chat = trigger.shadowRoot.querySelector("df-messenger-chat");
  var userInput = chat.shadowRoot.querySelector("df-messenger-user-input");
  var messageList = chat.shadowRoot.querySelector("df-messenger-message-list");
  
  /*Change to the correct triggerbutton*/
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
  var styleCitations = document.createElement('style');
  
  styleCitations.textContent = `
    .citations-list .citation span.title{white-space:break-spaces !important}
    .citations-list .citation .icon{display:none}
    .citations-message{text-transform:uppercase}
  `;
  
  chatbubbleStyle.textContent = `
    .bubble{position:absolute !important; bottom:105px;right:900px;display:none !important}
    .container{position:fixed !important; bottom:0px;right:0px }
    .chat-wrapper.expanded{bottom:0px !important; animation: .25s ease forwards slideInFromRight; border-top-right-radius:0px !important;transform:none !important; transition:none!important }
  
    
    
    
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

  `
  
  styleUserInput.textContent = `
    .input-box-wrapper{background-color:#FFFFFF !important;align-items:normal !important}
    .input-wrapper{border:1px solid rgba(0, 0, 0, 0.44); border-radius:4px 8px 8px 4px}
    #send-icon-button{background-color:#4E0174 !important;padding:14px !important; border-radius:8px}
    #send-icon-button:active{background-color:#8C07D0 !important}
    #send-icon-button:hover{background-color:#6D02A3 !important; cursor:pointer}
    #send-icon-button #send-icon{display:none}
    #send-icon-button:before{display:contents;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.02658 1.43248C1.20615 1.27832 1.45956 1.24412 1.67357 1.34516L14.6826 7.48697C14.8925 7.58608 15.0264 7.7974 15.0264 8.02954C15.0264 8.26169 14.8925 8.473 14.6826 8.57211L1.67356 14.7139C1.45955 14.8149 1.20614 14.7807 1.02658 14.6266C0.84701 14.4724 0.774836 14.2271 0.842308 14.0003L2.61825 8.02954L0.842307 2.05879C0.774836 1.83195 0.84701 1.58664 1.02658 1.43248ZM3.69174 8.62954L2.37525 13.0556L11.7502 8.62954H3.69174ZM11.7502 7.42954H3.69174L2.37525 3.00345L11.7502 7.42954Z' fill='white'/%3E%3C/svg%3E")}
    .send-icon-button-wrapper{background-color:#4E0174; border-top-right-radius:8px; border-bottom-right-radius:8px; min-height:48px; height:auto!important}
    .input-container{padding:16px !important; border-bottom-right-radius:0px !important; bottom:0px;right:0px};
  `
  messageListStyle.textContent = `
    .df-welcome-container{margin:auto;text-align:center;color:rgba(0, 0, 0, 0.62);}
    .df-welcome-container .df-welcome-icon{background-color:rgba(0, 0, 0, 0.05);border-radius:50%;height:48px;width:48px;margin:auto;background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M10.4596 17.121L7.9441 16.0077L10.3908 14.9393C10.3908 14.9393 10.3909 14.9393 10.3909 14.9393C11.53 14.442 12.4431 13.5318 12.9407 12.3876C12.9407 12.3875 12.9408 12.3874 12.9408 12.3873L14.0023 9.95289L15.0642 12.3882C15.561 13.5277 16.4706 14.4415 17.6144 14.9396C17.6145 14.9396 17.6146 14.9397 17.6147 14.9397L20.0494 16.0026L17.6139 17.0659C17.6138 17.0659 17.6138 17.0659 17.6138 17.0659C16.475 17.563 15.562 18.473 15.0643 19.6168C15.0643 19.6169 15.0643 19.6169 15.0642 19.6169C15.0641 19.6173 15.064 19.6176 15.0638 19.6179L14.0088 22.0365L12.9985 19.6876C12.9984 19.6873 12.9983 19.687 12.9981 19.6868C12.5067 18.5409 11.5997 17.6247 10.4603 17.1213C10.4603 17.1213 10.4602 17.1212 10.4602 17.1212C10.46 17.1211 10.4598 17.121 10.4596 17.121Z' stroke='%23990AE3' stroke-width='2'/%3E%3Cpath d='M9.89047 6.83371L8.00695 6.01142C7.55143 5.81309 7.18864 5.44891 6.99044 4.99427L6.16865 3.1096C6.1049 2.96347 5.89742 2.96347 5.83367 3.1096L5.01188 4.99427C4.81368 5.45007 4.44972 5.81309 3.99536 6.01142L2.10953 6.83487C1.96349 6.89866 1.96349 7.10511 2.10953 7.1689L4.02782 8.01787C4.48218 8.21851 4.84381 8.58385 5.0397 9.04081L5.83483 10.8895C5.89742 11.0368 6.10606 11.0368 6.16981 10.8895L6.99044 9.00834C7.18864 8.55254 7.55259 8.18952 8.00695 7.99119L9.89047 7.1689C10.0365 7.10511 10.0365 6.8975 9.89047 6.83371Z' fill='%23990AE3'/%3E%3Cpath d='M13.9452 1.91686L13.0035 1.50571C12.7757 1.40655 12.5943 1.22446 12.4952 0.997137L12.0843 0.0548005C12.0524 -0.0182668 11.9487 -0.0182668 11.9168 0.0548005L11.5059 0.997137C11.4068 1.22504 11.2249 1.40655 10.9977 1.50571L10.0548 1.91744C9.98174 1.94933 9.98174 2.05255 10.0548 2.08445L11.0139 2.50893C11.2411 2.60926 11.4219 2.79193 11.5198 3.02041L11.9174 3.94476C11.9487 4.01841 12.053 4.01841 12.0849 3.94476L12.4952 3.00417C12.5943 2.77627 12.7763 2.59476 13.0035 2.4956L13.9452 2.08445C14.0183 2.05255 14.0183 1.94875 13.9452 1.91686Z' fill='%23990AE3'/%3E%3C/svg%3E");background-repeat:no-repeat; background-position:center center;}
    .df-welcome-title-container .df-welcome-title{font-size:20px;font-weight:700;text-align:center;line-height:25px;color:rgba(0, 0, 0, 0.8); margin-top:16px;margin-bottom:16px}
    .df-welcome-container .df-welcome-title-container .df-welcome-subtitle{color:rgba(0, 0, 0, 0.62) !important;font-size:14px;}
    .message-list-wrapper{height:100% !important; border-radius:0px !important}
    .scroll-to-bottom-button{width:36px;height:36px}
    .scroll-to-bottom-button:before {content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.99994 13.9333C7.84081 13.9333 7.68819 13.8701 7.57567 13.7576L3.909 10.0909C3.67469 9.85663 3.67469 9.47673 3.90901 9.24242C4.14332 9.0081 4.52322 9.0081 4.75753 9.24242L7.39994 11.8848L7.39994 2.66668C7.39994 2.33531 7.66857 2.06668 7.99994 2.06668C8.33131 2.06668 8.59994 2.33531 8.59994 2.66668L8.59994 11.8848L11.2423 9.24242C11.4767 9.0081 11.8566 9.0081 12.0909 9.24242C12.3252 9.47673 12.3252 9.85663 12.0909 10.0909L8.4242 13.7576C8.31168 13.8701 8.15906 13.9333 7.99994 13.9333Z' fill='white'/%3E%3C/svg%3E")}
    .scroll-to-bottom-button .icon{display:none!important}
    ::-webkit-scrollbar {width: 10px;}
    
    ::-webkit-scrollbar-track {
    background-color: #fff;
      border: none;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #C6C6CD;
      border-radius:16px;
      width:8px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
  
  `
  htmlMessageStyle.textContent = `
    df-html-message{width:calc(100% - 24px) !important;max-width:calc(100% - 24px) !important;}
    .message-stack df-card{width:100%}
    
  `
  botInnerMessageStyle.textContent = `
    .bot-message .source-header{font-weight:500 !important; font-size:14px !important; line-height:14px !important;margin-top:16px;margin-bottom:8px}
    .bot-message p{margin-top:0px;margin-bottom:12px}
    .bot-message a{color:#6D02A3 !important}
    .bot-message a:hover{color:#4E0174 !important}
    .bot-message a:active{color:#29003E !important}
    .bot-message a:focus{border-bottom:2px solid #4E0174 !important}
    .bot-message a:focus-visible{outline:none !important}
  `
  userInnerMessageStyle.textContent = `
    df-text-message{width:calc(100% - 25px) !important; max-width:calc(100% - 25px) !important}
  `
  feedbackThumbsStyle.textContent = `
    .feedback .thumb:hover{fill:#4E0174}
    .feedback .thumbs-up svg{display:none}
    .feedback .thumbs-down svg{display:none}
    .feedback .thumbs-up:before{padding:8px;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.62531 1.41948C8.17472 1.05178 7.57916 0.977804 6.91524 1.07265C6.71328 1.1015 6.53981 1.231 6.45474 1.41643L4.23047 6.26482H2.00019C1.66882 6.26482 1.40019 6.53344 1.40019 6.8648L1.40006 13.9999C1.40006 14.1591 1.46327 14.3117 1.57579 14.4242C1.68832 14.5367 1.84093 14.5999 2.00006 14.5999L10.928 14.6C11.8368 14.6 12.6216 13.9671 12.8159 13.0802L13.8661 8.286C14.1301 7.08049 13.2125 5.93843 11.9776 5.93843H9.28253C9.29143 5.61601 9.30585 5.30177 9.31995 4.99464C9.32688 4.84355 9.33374 4.69417 9.33982 4.54639C9.36506 3.93301 9.37798 3.3313 9.30605 2.81967C9.23494 2.31378 9.06602 1.77911 8.62531 1.41948ZM5.21533 6.99588L7.39957 2.23477C7.67649 2.23259 7.80455 2.29855 7.86662 2.34921C7.95847 2.42416 8.06212 2.59111 8.11774 2.98673C8.17255 3.37661 8.16638 3.87631 8.14083 4.49705C8.13521 4.63375 8.12868 4.77579 8.12195 4.92226C8.09901 5.42139 8.0737 5.97201 8.0737 6.53843C8.0737 6.8698 8.34233 7.13843 8.6737 7.13843H11.9776C12.4455 7.13843 12.7941 7.57148 12.6939 8.02923L11.6437 12.8234C11.5699 13.1604 11.2721 13.4 10.928 13.4L2.60007 13.3999L2.60018 7.46482H4.01533V12.054C4.01533 12.3854 4.28396 12.654 4.61533 12.654C4.9467 12.654 5.21533 12.3854 5.21533 12.054V6.99588Z' fill='%236D02A3'/%3E%3C/svg%3E");}
    .feedback .thumbs-up:hover:before{height:48px; width:48px; background-color:#F5E0FF;border-radius:100px;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.62531 1.41948C8.17472 1.05178 7.57916 0.977804 6.91524 1.07265C6.71328 1.1015 6.53981 1.231 6.45474 1.41643L4.23047 6.26482H2.00019C1.66882 6.26482 1.40019 6.53344 1.40019 6.8648L1.40006 13.9999C1.40006 14.1591 1.46327 14.3117 1.57579 14.4242C1.68832 14.5367 1.84093 14.5999 2.00006 14.5999L10.928 14.6C11.8368 14.6 12.6216 13.9671 12.8159 13.0802L13.8661 8.286C14.1301 7.08049 13.2125 5.93843 11.9776 5.93843H9.28253C9.29143 5.61601 9.30585 5.30177 9.31995 4.99464C9.32688 4.84355 9.33374 4.69417 9.33982 4.54639C9.36506 3.93301 9.37798 3.3313 9.30605 2.81967C9.23494 2.31378 9.06602 1.77911 8.62531 1.41948ZM5.21533 6.99588L7.39957 2.23477C7.67649 2.23259 7.80455 2.29855 7.86662 2.34921C7.95847 2.42416 8.06212 2.59111 8.11774 2.98673C8.17255 3.37661 8.16638 3.87631 8.14083 4.49705C8.13521 4.63375 8.12868 4.77579 8.12195 4.92226C8.09901 5.42139 8.0737 5.97201 8.0737 6.53843C8.0737 6.8698 8.34233 7.13843 8.6737 7.13843H11.9776C12.4455 7.13843 12.7941 7.57148 12.6939 8.02923L11.6437 12.8234C11.5699 13.1604 11.2721 13.4 10.928 13.4L2.60007 13.3999L2.60018 7.46482H4.01533V12.054C4.01533 12.3854 4.28396 12.654 4.61533 12.654C4.9467 12.654 5.21533 12.3854 5.21533 12.054V6.99588Z' fill='%234E0174'/%3E%3C/svg%3E");}
    .feedback .thumbs-up:hover{height:48px; width:48px; background-color:#F5E0FF !important;border-radius:100px;}
    .feedback .thumbs-up:active:before{height:48px; width:48px; background-color:#E4B6FB;border-radius:100px;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.62531 1.41948C8.17472 1.05178 7.57916 0.977804 6.91524 1.07265C6.71328 1.1015 6.53981 1.231 6.45474 1.41643L4.23047 6.26482H2.00019C1.66882 6.26482 1.40019 6.53344 1.40019 6.8648L1.40006 13.9999C1.40006 14.1591 1.46327 14.3117 1.57579 14.4242C1.68832 14.5367 1.84093 14.5999 2.00006 14.5999L10.928 14.6C11.8368 14.6 12.6216 13.9671 12.8159 13.0802L13.8661 8.286C14.1301 7.08049 13.2125 5.93843 11.9776 5.93843H9.28253C9.29143 5.61601 9.30585 5.30177 9.31995 4.99464C9.32688 4.84355 9.33374 4.69417 9.33982 4.54639C9.36506 3.93301 9.37798 3.3313 9.30605 2.81967C9.23494 2.31378 9.06602 1.77911 8.62531 1.41948ZM5.21533 6.99588L7.39957 2.23477C7.67649 2.23259 7.80455 2.29855 7.86662 2.34921C7.95847 2.42416 8.06212 2.59111 8.11774 2.98673C8.17255 3.37661 8.16638 3.87631 8.14083 4.49705C8.13521 4.63375 8.12868 4.77579 8.12195 4.92226C8.09901 5.42139 8.0737 5.97201 8.0737 6.53843C8.0737 6.8698 8.34233 7.13843 8.6737 7.13843H11.9776C12.4455 7.13843 12.7941 7.57148 12.6939 8.02923L11.6437 12.8234C11.5699 13.1604 11.2721 13.4 10.928 13.4L2.60007 13.3999L2.60018 7.46482H4.01533V12.054C4.01533 12.3854 4.28396 12.654 4.61533 12.654C4.9467 12.654 5.21533 12.3854 5.21533 12.054V6.99588Z' fill='%2329003E'/%3E%3C/svg%3E");}
    .feedback .thumbs-up.active{height:48px; width:48px; background-color:#E4B6FB; border-radius:100px}
    .thumbs-up.focus-outline:focus-visible::before{display:contents;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.62531 1.41948C8.17472 1.05178 7.57916 0.977804 6.91524 1.07265C6.71328 1.1015 6.53981 1.231 6.45474 1.41643L4.23047 6.26482H2.00019C1.66882 6.26482 1.40019 6.53344 1.40019 6.8648L1.40006 13.9999C1.40006 14.1591 1.46327 14.3117 1.57579 14.4242C1.68832 14.5367 1.84093 14.5999 2.00006 14.5999L10.928 14.6C11.8368 14.6 12.6216 13.9671 12.8159 13.0802L13.8661 8.286C14.1301 7.08049 13.2125 5.93843 11.9776 5.93843H9.28253C9.29143 5.61601 9.30585 5.30177 9.31995 4.99464C9.32688 4.84355 9.33374 4.69417 9.33982 4.54639C9.36506 3.93301 9.37798 3.3313 9.30605 2.81967C9.23494 2.31378 9.06602 1.77911 8.62531 1.41948ZM5.21533 6.99588L7.39957 2.23477C7.67649 2.23259 7.80455 2.29855 7.86662 2.34921C7.95847 2.42416 8.06212 2.59111 8.11774 2.98673C8.17255 3.37661 8.16638 3.87631 8.14083 4.49705C8.13521 4.63375 8.12868 4.77579 8.12195 4.92226C8.09901 5.42139 8.0737 5.97201 8.0737 6.53843C8.0737 6.8698 8.34233 7.13843 8.6737 7.13843H11.9776C12.4455 7.13843 12.7941 7.57148 12.6939 8.02923L11.6437 12.8234C11.5699 13.1604 11.2721 13.4 10.928 13.4L2.60007 13.3999L2.60018 7.46482H4.01533V12.054C4.01533 12.3854 4.28396 12.654 4.61533 12.654C4.9467 12.654 5.21533 12.3854 5.21533 12.054V6.99588Z' fill='%2329003E'/%3E%3C/svg%3E")!important}
    
    .feedback .thumbs-down:before{display:block;transform:translateY(2px);content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.00945 14.2153C7.46005 14.583 8.05561 14.657 8.71953 14.5622C8.92149 14.5333 9.09496 14.4038 9.18002 14.2184L11.4043 9.37001L13.6346 9.37001C13.9659 9.37001 14.2346 9.10139 14.2346 8.77002L14.2347 1.63489C14.2347 1.47576 14.1715 1.32315 14.059 1.21062C13.9465 1.0981 13.7938 1.03488 13.6347 1.03488L4.70673 1.03487C3.79793 1.03487 3.01313 1.66776 2.81886 2.55462L1.76869 7.34883C1.50462 8.55434 2.42232 9.69639 3.65712 9.69639L6.35224 9.69639C6.34333 10.0188 6.32891 10.3331 6.31482 10.6402C6.30788 10.7913 6.30103 10.9407 6.29495 11.0884C6.26971 11.7018 6.25679 12.3035 6.32871 12.8152C6.39983 13.321 6.56875 13.8557 7.00945 14.2153ZM10.4194 8.63895L8.2352 13.4001C7.95828 13.4022 7.83022 13.3363 7.76814 13.2856C7.67629 13.2107 7.57264 13.0437 7.51703 12.6481C7.46222 12.2582 7.46839 11.7585 7.49393 11.1378C7.49956 11.0011 7.50609 10.859 7.51282 10.7126C7.53576 10.2134 7.56106 9.66282 7.56106 9.09639C7.56106 8.76502 7.29244 8.4964 6.96106 8.4964L3.65712 8.49639C3.18924 8.49639 2.84062 8.06335 2.94089 7.6056L3.99107 2.8114C4.06489 2.47439 4.36263 2.23487 4.70673 2.23487L13.0347 2.23488L13.0346 8.17001L11.6194 8.17001L11.6194 3.58082C11.6194 3.24945 11.3508 2.98082 11.0194 2.98082C10.6881 2.98082 10.4194 3.24945 10.4194 3.58082L10.4194 8.63895Z' fill='%236D02A3'/%3E%3C/svg%3E");!important}
    .feedback .thumbs-down:hover:before{padding:8px;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.00945 14.2153C7.46005 14.583 8.05561 14.657 8.71953 14.5622C8.92149 14.5333 9.09496 14.4038 9.18002 14.2184L11.4043 9.37001L13.6346 9.37001C13.9659 9.37001 14.2346 9.10139 14.2346 8.77002L14.2347 1.63489C14.2347 1.47576 14.1715 1.32315 14.059 1.21062C13.9465 1.0981 13.7938 1.03488 13.6347 1.03488L4.70673 1.03487C3.79793 1.03487 3.01313 1.66776 2.81886 2.55462L1.76869 7.34883C1.50462 8.55434 2.42232 9.69639 3.65712 9.69639L6.35224 9.69639C6.34333 10.0188 6.32891 10.3331 6.31482 10.6402C6.30788 10.7913 6.30103 10.9407 6.29495 11.0884C6.26971 11.7018 6.25679 12.3035 6.32871 12.8152C6.39983 13.321 6.56875 13.8557 7.00945 14.2153ZM10.4194 8.63895L8.2352 13.4001C7.95828 13.4022 7.83022 13.3363 7.76814 13.2856C7.67629 13.2107 7.57264 13.0437 7.51703 12.6481C7.46222 12.2582 7.46839 11.7585 7.49393 11.1378C7.49956 11.0011 7.50609 10.859 7.51282 10.7126C7.53576 10.2134 7.56106 9.66282 7.56106 9.09639C7.56106 8.76502 7.29244 8.4964 6.96106 8.4964L3.65712 8.49639C3.18924 8.49639 2.84062 8.06335 2.94089 7.6056L3.99107 2.8114C4.06489 2.47439 4.36263 2.23487 4.70673 2.23487L13.0347 2.23488L13.0346 8.17001L11.6194 8.17001L11.6194 3.58082C11.6194 3.24945 11.3508 2.98082 11.0194 2.98082C10.6881 2.98082 10.4194 3.24945 10.4194 3.58082L10.4194 8.63895Z' fill='%234E0174'/%3E%3C/svg%3E");}
    .feedback .thumbs-down:hover{height:48px; width:48px; background-color:#F5E0FF !important;border-radius:100px;}
    .feedback .thumbs-down:active:before{padding:8px;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.00945 14.2153C7.46005 14.583 8.05561 14.657 8.71953 14.5622C8.92149 14.5333 9.09496 14.4038 9.18002 14.2184L11.4043 9.37001L13.6346 9.37001C13.9659 9.37001 14.2346 9.10139 14.2346 8.77002L14.2347 1.63489C14.2347 1.47576 14.1715 1.32315 14.059 1.21062C13.9465 1.0981 13.7938 1.03488 13.6347 1.03488L4.70673 1.03487C3.79793 1.03487 3.01313 1.66776 2.81886 2.55462L1.76869 7.34883C1.50462 8.55434 2.42232 9.69639 3.65712 9.69639L6.35224 9.69639C6.34333 10.0188 6.32891 10.3331 6.31482 10.6402C6.30788 10.7913 6.30103 10.9407 6.29495 11.0884C6.26971 11.7018 6.25679 12.3035 6.32871 12.8152C6.39983 13.321 6.56875 13.8557 7.00945 14.2153ZM10.4194 8.63895L8.2352 13.4001C7.95828 13.4022 7.83022 13.3363 7.76814 13.2856C7.67629 13.2107 7.57264 13.0437 7.51703 12.6481C7.46222 12.2582 7.46839 11.7585 7.49393 11.1378C7.49956 11.0011 7.50609 10.859 7.51282 10.7126C7.53576 10.2134 7.56106 9.66282 7.56106 9.09639C7.56106 8.76502 7.29244 8.4964 6.96106 8.4964L3.65712 8.49639C3.18924 8.49639 2.84062 8.06335 2.94089 7.6056L3.99107 2.8114C4.06489 2.47439 4.36263 2.23487 4.70673 2.23487L13.0347 2.23488L13.0346 8.17001L11.6194 8.17001L11.6194 3.58082C11.6194 3.24945 11.3508 2.98082 11.0194 2.98082C10.6881 2.98082 10.4194 3.24945 10.4194 3.58082L10.4194 8.63895Z' fill='%2329003E'/%3E%3C/svg%3E");}
    .feedback .thumbs-down.active{height:48px; width:48px; background-color:#E4B6FB; border-radius:100px}
    .thumbs-down.focus-outline:focus-visible::before{display:contents;content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.00945 14.2153C7.46005 14.583 8.05561 14.657 8.71953 14.5622C8.92149 14.5333 9.09496 14.4038 9.18002 14.2184L11.4043 9.37001L13.6346 9.37001C13.9659 9.37001 14.2346 9.10139 14.2346 8.77002L14.2347 1.63489C14.2347 1.47576 14.1715 1.32315 14.059 1.21062C13.9465 1.0981 13.7938 1.03488 13.6347 1.03488L4.70673 1.03487C3.79793 1.03487 3.01313 1.66776 2.81886 2.55462L1.76869 7.34883C1.50462 8.55434 2.42232 9.69639 3.65712 9.69639L6.35224 9.69639C6.34333 10.0188 6.32891 10.3331 6.31482 10.6402C6.30788 10.7913 6.30103 10.9407 6.29495 11.0884C6.26971 11.7018 6.25679 12.3035 6.32871 12.8152C6.39983 13.321 6.56875 13.8557 7.00945 14.2153ZM10.4194 8.63895L8.2352 13.4001C7.95828 13.4022 7.83022 13.3363 7.76814 13.2856C7.67629 13.2107 7.57264 13.0437 7.51703 12.6481C7.46222 12.2582 7.46839 11.7585 7.49393 11.1378C7.49956 11.0011 7.50609 10.859 7.51282 10.7126C7.53576 10.2134 7.56106 9.66282 7.56106 9.09639C7.56106 8.76502 7.29244 8.4964 6.96106 8.4964L3.65712 8.49639C3.18924 8.49639 2.84062 8.06335 2.94089 7.6056L3.99107 2.8114C4.06489 2.47439 4.36263 2.23487 4.70673 2.23487L13.0347 2.23488L13.0346 8.17001L11.6194 8.17001L11.6194 3.58082C11.6194 3.24945 11.3508 2.98082 11.0194 2.98082C10.6881 2.98082 10.4194 3.24945 10.4194 3.58082L10.4194 8.63895Z' fill='%2329003E'/%3E%3C/svg%3E")!important}
    .thumbs-down.focus-outline:focus-visible,.thumbs-up.focus-outline:focus-visible{border:2px solid #B12DF4;height:56px;width:56px;border-radius:2px}
    .feedback-reason-chip{border-radius:999px !important; padding:0.75rem 1.25rem !important; font-size:16px !important; font-family:"Telia Sans" !important; font-weight:500}
    .feedback-submit{border-radius:999px !important; padding:0.75rem 1.25rem !important; font-size:16px !important; font-family:"Telia Sans" !important; font-weight:500}
    .feedback-submit:disabled{background-color:rgba(0, 0, 0, 0.1) !important;color:rgba(0, 0, 0, 0.44)!important;opacity:1 !important;border:rgba(0, 0, 0, 0.1) 1px solid}
    .feedback .textarea-row textarea{border-radius:4px; padding:0.75rem 0.5rem !important; font-size:16px !important}
    `
  sourceStyle.textContent = `
    .bot-message .df-source:last-of-type a{display:none !important; border-color:#6D02A3 !important}
  `
  handoverButtonStyle.textContent = `
    #dfButtonWrapper{justify-content:center;background-color:#4E0174 !important;color:#fff !important}
    #dfButtonWrapper::hover{background-color:#6D02A3; color:#FFF !important}
    #dfButtonWrapper .text.word-wrap{font-weight:500 !important;padding-left:16px !important}
    #dfButtonWrapper #materialButtonIcon{display:none !important}
    #dfButtonAnchorWrapper #materialButtonIcon{display:none !important}
    #dfButtonAnchorWrapper {justify-content:center}
    #dfButtonAnchorWrapper .text.word-wrap{font-weight:500 !important;padding-left:16px !important}
    #dfButtonAnchorWrapper .df-button-icon:before{content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.56085 1.48547C4.06021 1.07064 4.7143 1.19914 5.09733 1.58217L6.95285 3.43769C7.44751 3.93235 7.44752 4.73436 6.95285 5.22902L5.89566 6.28621C5.86963 6.31225 5.86963 6.35446 5.89566 6.38049L9.61952 10.1044C9.64555 10.1304 9.68776 10.1304 9.7138 10.1044L10.771 9.04716C11.2657 8.5525 12.0677 8.5525 12.5623 9.04716L14.8956 11.3805C15.1238 11.6086 15.3605 12.0629 15.1024 12.5421C14.8711 12.9718 14.3202 13.6188 12.9995 14.4992C11.8323 15.2774 10.5546 15.3452 9.46777 15.1013C8.39453 14.8606 7.45821 14.3069 6.90899 13.7575C6.67471 13.5232 6.67478 13.1433 6.90913 12.909C7.14348 12.6747 7.52338 12.6748 7.75766 12.9092C8.13936 13.291 8.86973 13.7374 9.73045 13.9304C10.5776 14.1205 11.5011 14.056 12.3338 13.5008C13.3227 12.8416 13.7588 12.3811 13.9458 12.1277L11.7138 9.89569C11.6878 9.86966 11.6456 9.86966 11.6195 9.89569L10.5623 10.9529C10.0677 11.4475 9.26565 11.4475 8.77099 10.9529L5.04713 7.22902C4.55247 6.73436 4.55247 5.93235 5.04713 5.43769L6.10432 4.38049C6.13036 4.35446 6.13036 4.31225 6.10432 4.28621L4.27285 2.45474C3.97448 2.71014 3.48374 3.18906 2.80186 4.04149C2.21687 4.77278 2.04146 5.42841 2.05042 6.00872C2.05967 6.60749 2.26603 7.18046 2.53858 7.73559C2.69831 8.06092 3.02736 8.45471 3.57296 8.98856C3.94694 9.35449 4.39088 9.7568 4.90727 10.2248C5.13696 10.4329 5.38099 10.6541 5.63957 10.8908C5.884 11.1145 5.90075 11.4941 5.677 11.7385C5.45325 11.9829 5.07372 11.9997 4.8293 11.7759C4.58462 11.5519 4.34824 11.3377 4.12208 11.1327C3.59574 10.6557 3.1248 10.2289 2.73372 9.84627C2.17987 9.30436 1.71873 8.78856 1.4614 8.26445C1.1574 7.64526 0.863814 6.88489 0.850564 6.02725C0.83703 5.15114 1.11656 4.22726 1.86479 3.29189C2.6298 2.33555 3.19471 1.78964 3.56085 1.48547Z' fill='%236D02A3'/%3E%3C/svg%3E");}
    #dfButtonWrapper .df-button-icon:before{content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.41675 2.33337C1.41675 1.64302 1.97639 1.08337 2.66675 1.08337H8.00008C8.60482 1.08337 9.10926 1.51281 9.22508 2.08337H13.6667C14.3571 2.08337 14.9167 2.64302 14.9167 3.33337V5.00004C14.9167 5.6904 14.3571 6.25004 13.6667 6.25004H12.575L11.4126 7.41252C11.1848 7.64033 10.8154 7.64033 10.5876 7.41252C10.3598 7.18471 10.3598 6.81537 10.5876 6.58756L11.9209 5.25423C12.0303 5.14483 12.1787 5.08337 12.3334 5.08337H13.6667C13.7128 5.08337 13.7501 5.04606 13.7501 5.00004V3.33337C13.7501 3.28735 13.7128 3.25004 13.6667 3.25004H9.25008V5.00004C9.25008 5.04606 9.28739 5.08337 9.33341 5.08337H10.0001C10.3222 5.08337 10.5834 5.34454 10.5834 5.66671C10.5834 5.98887 10.3222 6.25004 10.0001 6.25004H9.33341C8.72867 6.25004 8.22424 5.8206 8.10842 5.25004H6.66675C6.34458 5.25004 6.08341 4.98887 6.08341 4.66671C6.08341 4.34454 6.34458 4.08337 6.66675 4.08337H8.08341V2.33337C8.08341 2.28735 8.04611 2.25004 8.00008 2.25004H2.66675C2.62072 2.25004 2.58341 2.28735 2.58341 2.33337V4.00004C2.58341 4.04606 2.62072 4.08337 2.66675 4.08337H4.33341C4.48812 4.08337 4.6365 4.14483 4.74589 4.25423L6.74589 6.25423C6.9737 6.48203 6.9737 6.85138 6.74589 7.07919C6.51809 7.30699 6.14874 7.30699 5.92094 7.07919L4.09179 5.25004H2.66675C1.97639 5.25004 1.41675 4.6904 1.41675 4.00004V2.33337ZM5.00008 8.91671C4.35505 8.91671 3.82048 9.44768 3.82048 10.1172C3.82048 10.4386 3.94378 10.7284 4.14446 10.9435C4.36096 11.1756 4.6644 11.3176 5.00008 11.3176C5.33577 11.3176 5.6392 11.1756 5.85571 10.9435C6.05639 10.7284 6.17969 10.4386 6.17969 10.1172C6.17969 9.44768 5.64511 8.91671 5.00008 8.91671ZM2.65381 10.1172C2.65381 8.81632 3.69783 7.75004 5.00008 7.75004C6.30234 7.75004 7.34635 8.81632 7.34635 10.1172C7.34635 10.4313 7.28549 10.7317 7.17496 11.0065C7.41958 11.1116 7.70136 11.2688 7.92012 11.5003C7.94746 11.5293 7.97414 11.559 8.00012 11.5896C8.10873 11.4615 8.22663 11.3519 8.34849 11.2587C8.50436 11.1395 8.66389 11.0492 8.81502 10.9808C8.71094 10.7129 8.65381 10.4215 8.65381 10.1172C8.65381 8.81632 9.69783 7.75004 11.0001 7.75004C12.3023 7.75004 13.3464 8.81632 13.3464 10.1172C13.3464 10.4313 13.2855 10.7317 13.175 11.0065C13.4196 11.1116 13.7014 11.2688 13.9201 11.5003C14.4603 12.072 14.7416 12.9688 14.49 14.2863C14.4185 14.661 14.09 14.9167 13.7255 14.9167H8.27467C8.1788 14.9167 8.08615 14.8991 8.00023 14.8667C7.91376 14.8992 7.82087 14.9167 7.7255 14.9167H2.27467C1.90314 14.9167 1.57989 14.6523 1.50973 14.2842C1.36451 13.5222 1.39521 12.8965 1.56138 12.386C1.72947 11.8695 2.02502 11.506 2.34849 11.2587C2.50436 11.1395 2.66389 11.0492 2.81502 10.9808C2.71094 10.7129 2.65381 10.4215 2.65381 10.1172ZM3.52948 11.9617C3.38707 11.9985 3.21342 12.0659 3.05722 12.1854C2.90606 12.301 2.7599 12.4732 2.67077 12.747C2.59611 12.9764 2.5544 13.2996 2.60689 13.75H7.39339C7.40818 13.6238 7.41562 13.5073 7.4169 13.3998C7.41671 13.3775 7.41671 13.3555 7.4169 13.3335C7.41022 12.7738 7.23202 12.4708 7.0721 12.3016C6.97326 12.197 6.77994 12.0945 6.55067 12.0155C6.51431 12.003 6.47906 11.9917 6.44565 11.9817C6.04804 12.2957 5.546 12.4843 5.00008 12.4843C4.44265 12.4843 3.93095 12.2877 3.52948 11.9617ZM8.60689 13.75H13.3934C13.491 12.9163 13.2679 12.5088 13.0721 12.3016C12.9733 12.197 12.7799 12.0945 12.5507 12.0155C12.5143 12.003 12.4791 11.9917 12.4457 11.9817C12.048 12.2957 11.546 12.4843 11.0001 12.4843C10.4426 12.4843 9.93095 12.2877 9.52948 11.9617C9.38707 11.9985 9.21342 12.0659 9.05722 12.1854C8.90606 12.301 8.7599 12.4732 8.67077 12.747C8.59611 12.9764 8.5544 13.2996 8.60689 13.75ZM11.0001 8.91671C10.355 8.91671 9.82048 9.44768 9.82048 10.1172C9.82048 10.4386 9.94378 10.7284 10.1445 10.9435C10.361 11.1756 10.6644 11.3176 11.0001 11.3176C11.3358 11.3176 11.6392 11.1756 11.8557 10.9435C12.0564 10.7284 12.1797 10.4386 12.1797 10.1172C12.1797 9.44768 11.6451 8.91671 11.0001 8.91671Z' fill='white'/%3E%3C/svg%3E");margin-right:8px}
    #dfButtonWrapper:hover .df-button-icon{opacity:1 !important}
    #dfButtonWrapper:hover .word-wrap{opacity:1 !important}
    #dfButtonWrapper:hover{background-color:#6D02A3 !important}
    #dfButtonWrapper:active .df-button-icon{opacity:1 !important}
    #dfButtonWrapper:active .word-wrap{opacity:1 !important}
    #dfButtonWrapper:active{background-color:#8C07D0 !important}
    .focus-outline:focus-visible, .focus-outline-contrast:focus-visible{box-shadow:0px 0px 0px 2px #B12DF4; border:4px solid #fff !important}
    .focus-outline:focus-visible::before{border:none !important}
    `
  titlebarWrapperStyle.textContent = `
    .titlebar-wrapper{border-top-right-radius:0px !important; position:sticky!important}
  `
  titlebar.textContent = `
    df-messenger-titlebar{position:sticky !important; top:0}
  `
  messageWrapperStyle.textContent = `
    df-messenger-message-list{display:block !important}
  `
  chat.shadowRoot.appendChild(messageWrapperStyle);
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
    --df-messenger-default-font-family:Telia Sans;
    bottom:0px;
    top:0px;
    right:0px
  }
  df-messenger-chat-bubble {
    --df-messenger-chat-bubble-background:transparent;
    --df-messenger-default-border-color:#FFFFFF;
    --df-messenger-default-border:1px solid rgba(0, 0, 0, 0.44);
    --df-messenger-default-box-shadow:none;
    --df-messenger-chat-bubble-background: #FFFFFF;
    --df-messenger-chat-bubble-icon-size:40px;
    --df-messenger-chat-window-height: ${screenHeight}px;
    --df-messenger-chat-background: #FFFFFF;
    --df-messenger-chat-scroll-button-display:block;
    --df-messenger-chat-scroll-button-background-color:rgba(43, 43, 43, 1);
    --df-messenger-chat-scroll-button-padding:7.5px;
    --df-messenger-chat-scroll-button-text-display:none;
    --df-messenger-message-bot-background: #F5F5FA;
    --df-messenger-message-bot-font-color: rgba(0, 0, 0, 0.8);
    --df-messenger-message-bot-font-weight: 400;
    --df-messenger-message-bot-writing-spacing:0px;
    --df-messenger-message-font-size: 16px;
    --df-messenger-message-user-background: #FAF0FF;
    --df-messenger-message-user-font-color: rgba(0, 0, 0, 0.8);
    --df-messenger-message-user-font-weight: 400;
    --df-messenger-message-feedback-spacing:8px;
    --df-messenger-message-border-radius: 8px;
    --df-messenger-message-spacing:16px;
    --df-messenger-message-stack-spacing:16px;
    --df-messenger-send-icon-color: #FFFFFF;
    --df-messenger-send-icon-color-disabled:#FFFFFF;
    --df-messenger-input-padding: 0px;
    --df-messenger-input-font-size: 16px;
    --df-messenger-input-box-padding: 15px;
    --df-messenger-input-background:#fff;
    --df-messenger-input-border-top:none;
    --df-messenger-input-border-bottom:1px solid rgba(0, 0, 0, 0.44);
    --df-messenger-message-feedback-icon-font-color: #6D02A3;
    --df-messenger-message-feedback-icon-font-color-active:#29003E;
    --df-messenger-citations-font-color: #6D02A3;
    --df-messenger-citations-border-color: #6D02A3;
    --df-messenger-citations-border-radius: 50px;
    --df-messenger-citations-font-size: 16px;
    --df-messenger-citations-message-font-size: 14px;
    --df-messenger-citations-padding:12px 20px;
    --df-messenger-citations-font-weight:500;
    --df-messenger-message-user-writing-image-width:250px;
    --df-messenger-focus-color:#6D02A3;
    --df-messenger-titlebar-padding:5px 15px;
    --df-messenger-titlebar-font-color:rgba(0, 0, 0, 0.8);
    --df-messenger-titlebar-border-bottom:rgba(0, 0, 0, 0.1) 1px solid;
    --df-messenger-citations-background:#F5F5FA;
    --df-messenger-send-icon-offset-y:1px;
    --df-messenger-card-background:#ffffff;
    --df-messenger-button-border-radius:50px;
    --df-messenger-button-border: 1px solid #6D02A3;
    --df-messenger-button-font-color:#6D02A3;
    --df-messenger-button-text-align:center;
    --df-messenger-button-font-size:16px;
    --df-messenger-button-padding:14px;
    --df-messenger-button-icon-font-size:18px;
    --df-messenger-link-visited-font-color:#6D02A3;
    --df-messenger-link-hover-font-color:#4E0174;
    --df-messenger-link-font-color:#6D02A3;
    --df-messenger-message-rich-feedback-chips-background:#ffffff;
    --df-messenger-message-rich-feedback-chips-font-color:#6D02A3;
    --df-messenger-message-rich-feedback-chips-background-hover:#F5E0FF;
    --df-messenger-message-rich-feedback-chips-font-color-hover:#4E0174;
    --df-messenger-message-rich-feedback-chips-background-active:#E4B6FB;
    --df-messenger-message-rich-feedback-chips-font-color-active:#29003E;
    --df-messenger-titlebar-button-background-hover:#F5E0FF;
    --df-messenger-message-rich-feedback-submit-font-color:#6D02A3;
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
    /*Adds different styling depending on screen-width*/
    styleElement =createStyleElement(commonStyles + (screenWidth <= 600 ? mobileStyles : desktopStyles))
    document.head.appendChild(styleElement);
    trigger.shadowRoot.appendChild(chatbubbleStyle);
  };
  updateStyles();

  /*Checks if windowsize is changed to adjust the css*/
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
        position:sticky!important;
        top:0;
        left:0;
        width:100%;
        z-index:2
      }
    `
    chat.appendChild(titlebarStyle);
  }
  /*End custom style elements*/
  
  /*Welcome message that is initally shown when opening the widget*/
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
  welcomeSubtitle.innerText = "Jag är en AI-chatt och kan ibland göra misstag. Kolla gärna en extra gång innan du slutför ett eventuellt köp att produkten motsvarar det du vill ha. Dela inte några personliga uppgifter här.";
  
  welcomeContainer.appendChild(welcomeIcon)
  welcomeTitleContainer.appendChild(welcomeTitle)
  welcomeContainer.appendChild(welcomeTitleContainer)
  welcomeContainer.appendChild(welcomeSubtitle)
  
  
  var messageArea = chat.shadowRoot.querySelector('.message-list-wrapper df-messenger-message-list');
  var messageList = messageArea.shadowRoot.querySelector('.message-list-wrapper');
  var messages = messageList.querySelector('#message-list .content');
  var userInput = chat.shadowRoot.querySelector('df-messenger-user-input');
  userInput.shadowRoot.appendChild(styleUserInput);
  
  /*Checks where to add the welcome message if a conversation is started and the user reloads the page*/
  if (messages.firstChild) {
    messages.insertBefore(welcomeContainer, messages.firstChild);
  } else {
    messages.appendChild(welcomeContainer);
  }
  document.body.appendChild(htmlMessageStyle);
  messageArea.shadowRoot.appendChild(messageListStyle);

  /*End welcome message*/

  checkElementsExist();
  
  /*The user sent a message*/
  window.addEventListener('df-request-sent', (event) => {
    setTimeout(addUserUtteranceStyle, 100);
  });
  
  /*Response is received*/
  window.addEventListener('df-response-received', (event) => {
    setTimeout(() => checkIfWhisbi(event), 100);
    setTimeout(addBotUtteranceStyle, 100);
    addFeedbackStyle();
  });
  
  function addUserUtteranceStyle() {
    var userUtterances = messageList.querySelectorAll('.content .user');
    if (userUtterances) {
      var firstUtterance = messageList.querySelector('.content .user');
      firstUtterance.setAttribute("style", "margin-top:32px");
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
      //utterance.shadowRoot.appendChild(userInnerMessageStyle);
    }
  }
  
  function addBotUtteranceStyle() {
    var utterance = messageList.querySelector('.bot:last-child df-messenger-utterance');
    var botUtterance = utterance?.shadowRoot.querySelector("df-html-message");
    var htmlMessageStyleClone = htmlMessageStyle.cloneNode(true);
    var botInnerMessageStyleClone = botInnerMessageStyle.cloneNode(true);
    botUtterance?.appendChild(htmlMessageStyleClone);
    botUtterance?.shadowRoot.appendChild(botInnerMessageStyleClone);

    /*Checks if the response contains buttons*/
    if (utterance.shadowRoot.querySelector('.message-stack df-card')) {
      var allButtons = utterance.shadowRoot.querySelectorAll('.message-stack df-card');
      allButtons.forEach(button => {
        var handoverButton = button.shadowRoot.querySelector('df-button');
        var handoverButtonStyleClone = handoverButtonStyle.cloneNode(true);
        handoverButton.shadowRoot.appendChild(handoverButtonStyleClone);
      });
    }

    addFeedbackStyle(utterance);
    checkSources(utterance);
  }
  function checkSources(botUtterance) {
    var citation = botUtterance?.shadowRoot?.querySelector('df-citations');
    var source1 = citation?.shadowRoot?.querySelector('.citation:first-of-type');
    var source2 = citation?.shadowRoot?.querySelector('.citation:last-of-type');
    var source1 = citation?.shadowRoot?.querySelector('.citation:first-of-type');
    var source1Title = source1?.querySelector('.title');
    var source2 = citation?.shadowRoot?.querySelector('.citation:last-of-type');
    var source2Title = source2?.querySelector('.title');
    var styleCitationsClone = styleCitations.cloneNode(true);
    citation?.shadowRoot?.appendChild(styleCitationsClone);

    /*Removes  – Telia.se from the link-text*/
    if (source1Title) source1Title.innerHTML = source1Title.innerHTML.replace(" – Telia.se", "");
    if (source2Title) source2Title.innerHTML = source2Title.innerHTML.replace(" – Telia.se", "");

    /*If the sources link to the same page, remove one of the buttons*/
    if (source1Title?.innerText === source2Title?.innerText) {
      source2?.remove();
    }
  }
  function addFeedbackStyle() {
    var utterance = messageList.querySelector('.bot:last-child df-messenger-utterance');
    if (utterance?.shadowRoot?.querySelector('df-messenger-feedback')) {
      var feedback = utterance.shadowRoot.querySelector('df-messenger-feedback');
      var feedbackStyleClone = feedbackThumbsStyle.cloneNode(true);
      feedback.shadowRoot.appendChild(feedbackStyleClone);
    }
  }
  
  function checkIfWhisbi(response){
    if(response.detail.raw?.queryResult?.triggerEvent === "triggerWhisbi"){
      var utterance = messageList.querySelector('.bot:last-child df-messenger-utterance');
      var button = utterance.shadowRoot.querySelector('.message-stack df-card');
      var handoverButton = button.shadowRoot.querySelector('df-button');
      var handoverButtonStyleClone = handoverButtonStyle.cloneNode(true);
      handoverButton.shadowRoot.appendChild(handoverButtonStyleClone);

      const openWhisbiEvent = new CustomEvent("ace-open-whisbi", {});
      window.dispatchEvent(openWhisbiEvent);
      const dfMessengerBubble = document.querySelector('df-messenger-chat-bubble');
      dfMessengerBubble.closeChat();
    }
  }
  function checkElementsExist() {
    /*Applies styling to existing conversation after reload of page*/
    allUserUtterances();
    allBotUtterances();
    checkAllSources();
    styleAllFeedbackButtons();
  }
  
  function allUserUtterances() {
    var userUtterances = messageList.querySelectorAll('.content .user');
    var firstUtterance = messageList?.querySelector('.content .user');
    firstUtterance?.setAttribute("style", "margin-top:32px");
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
      if (botUtterance.shadowRoot.querySelector('.message-stack df-card')) {
        var allButtons = botUtterance.shadowRoot.querySelectorAll('.message-stack df-card');
        allButtons.forEach(button => {
          var handoverButton = button.shadowRoot.querySelector('df-button');
          var handoverButtonStyleClone = handoverButtonStyle.cloneNode(true);
          handoverButton.shadowRoot.appendChild(handoverButtonStyleClone);
        });
      }
    });
  }
  
  function styleAllFeedbackButtons(){
    var botUtterances = messageList.querySelectorAll('.content .bot');
    botUtterances?.forEach(utterance => {
      var botUtterance = utterance.querySelector('df-messenger-utterance');
      var feedback = botUtterance.shadowRoot.querySelector('df-messenger-feedback');
      var feedbackThumbsStyleClone = feedbackThumbsStyle.cloneNode(true);
      feedback.shadowRoot.appendChild(feedbackThumbsStyleClone);
    })
  }
  function checkAllSources() {
    var botUtterances = messageList?.querySelectorAll('.content .bot df-messenger-utterance');
    botUtterances?.forEach(utterance => {
      var citation = utterance.shadowRoot?.querySelector('df-citations');
      var source1 = citation?.shadowRoot?.querySelector('.citation:first-of-type');
      var source1Title = source1?.querySelector('.title');
      var source2 = citation?.shadowRoot?.querySelector('.citation:last-of-type');
      var source2Title = source2?.querySelector('.title');
      var styleCitationsClone = styleCitations.cloneNode(true);
      citation?.shadowRoot?.appendChild(styleCitationsClone);
          if (source1Title) source1Title.innerHTML = source1Title.innerHTML.replace(" – Telia.se", "");
          if (source2Title) source2Title.innerHTML = source2Title.innerHTML.replace(" – Telia.se", "");
        
      
      if (source1Title?.innerText === source2Title?.innerText) {
        source2?.remove();
      }
    });
  }
});
  
