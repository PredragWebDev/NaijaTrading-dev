import "./faqs.css";
import "./navigation.css";

export const Faqs = (props) => {
  return (
    <div className='faqs'>
      <div className='imgNfaqs'>
        <img src="./img/faqs.svg" alt="" className="img"/>
        FAQs
      </div>
        
      <div className='faq_n'>
        <div>
          <span className="question">Is it possible to play the crypto market game independently?</span>
        </div>
        <div className="answer">Yes, you can trade and manage your portfolio by yourself as the other simulator users do not impact your portfolio.
        </div>
      </div>
        
      <div className='faq_n'>
        <div>
          <span className="question">Is there any cost associated with playing the crypto market game?</span>
        </div>
        <div className="answer">No, there is no cost involved. You can sign up for free without providing any of your financial information, and you will be provided with virtual cash to begin trading.
        </div>
      </div>
      <div className="faq_n">
        <a href="/signup" id="get_started_btn" className="getstared-btn">GET STARTED</a>
      </div>
    </div>
  )
}
