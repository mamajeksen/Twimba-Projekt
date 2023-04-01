
import { tweetsData } from './data.js'
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')

let currentReplyText = ''

// tweetBtn.addEventListener('click', function(){
//     console.log(tweetInput.value)
// })

//  replyBtn.addEventListener('click', function() {
//         console.log(reply)
//          })

document.addEventListener('click', function(e){
    
    const replyBtn = document.getElementById('reply-btn')
    const replyInput = document.getElementById('reply-input')
    
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target === tweetBtn && tweetInput.value) {
        handleTweetBtnClick()
    }
    else if (e.target.dataset.replies) {
        handleRepliesValue(e.target.dataset.replies)
    }
    else if (e.target.dataset.trash) {
        handleTrashClick(e.target.dataset)
    }
    
/*
Challenge:
1. Add an else if so that if the Tweet button
   is clicked, handleTweetBtnClick is called.
*/ 
})


 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}
    
function handleReplyClick(replyId){
    
    //  const targetTweetObj = tweetsData.filter(function(tweet){
    //     return tweet.uuid === replyId
    // })[0]
    
    tweetsData.forEach(function(tweet){
        if (tweet.uuid != replyId) {
            tweet.isReplyOpen = false
        }
        else {
            tweet.isReplyOpen = !tweet.isReplyOpen
        }
    })
    
    // targetTweetObj.isReplyOpen = !targetTweetObj.isReplyOpen
    render()
    
}

function handleTweetBtnClick(){
    
    const newTweet = {handle: "@Scrimba", 
                      profilePic: "/images/scrimbalogo.png",
                      likes: 0,
                      retweets: 0,
                      tweetText: tweetInput.value,
                      replies: [],
                      isLiked: false,
                      isRetweeted: false,
                      uuid: self.crypto.randomUUID(),}
    
    tweetsData.unshift(newTweet)
    tweetInput.value = ''
    render()
}

function handleRepliesValue(postingId) {
    
    
       const newReply = { handle: "@Scrimba",
                         profilePic: "/images/scrimbalogo.png",
                         tweetText: document.getElementById(postingId).value,
                         likes: 0,
                         isLiked: false,
                         uuid: self.crypto.randomUUID(),}
    
 const thisReply = tweetsData.filter(function(reply){
      return reply.uuid === postingId
                 })[0]   
                 
                 if (document.getElementById(postingId).value){
                  thisReply.replies.unshift(newReply)}
                  render()
}

function handleTrashClick(dataSet) {
    
 const thisTweet = tweetsData.filter(function(reply){
      return reply.uuid === dataSet.tweet
                 })[0]   
                 
                 let x = thisTweet.replies.findIndex(function(reply) {
                     return reply.uuid === dataSet.trash
                 })
                 
                  thisTweet.replies.splice(x, 1)
                  render()
}

function getFeedHtml(){
    
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let replyIsOpenClass = 'hidden'
        
        if (tweet.isReplyOpen){
            replyIsOpenClass = 'reply-area'
        }
        
        
        
        let repliesHtml = `
        <div>
            <img src="/images/scrimbalogo.png" 
            class="profile-pic-reply">
            <textarea type="text" 
            placeholder="reply..."
            id="${tweet.uuid}"
            class="reply-input"></textarea>
        </div>
            <div>
                <button id="reply-btn" data-replies="${tweet.uuid}">Reply</button>
            </div>`
            
        
    //    function hideIcon(self) {
    //     self.style.backgroundImage = 'none';
    //     }
            
            
     
            
            tweet.replies.forEach(function(reply){
                
                if(reply.handle === `@Scrimba`){
                
                repliesHtml+=`
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div >
                                <p class="handle">${reply.handle}</p>
                                <div class"reply-order">
                                    <p class="tweet-text">${reply.tweetText}</p>
                                    <i class="fa-solid fa-trash" data-tweet="${tweet.uuid}" data-trash="${reply.uuid}"></i>
                                </div>
                              </div>
                          </div>
                            
                     </div>
                </div>
                `
            } else { 
                
                repliesHtml+=`
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                                <div class="reply-btns">
                              </div>
                          </div>
                            
                     </div>
                </div>
                ` 
            } })
        
        
          
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="${replyIsOpenClass}" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
</div>
`
    })
    
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()



