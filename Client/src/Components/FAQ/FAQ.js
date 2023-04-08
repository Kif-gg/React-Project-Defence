export default function FAQ() {

    const toggleAccordion = (e) => {
        e.currentTarget.nextSibling.classList.toggle('answer-shown');
        e.currentTarget.nextSibling.classList.toggle('answer-hidden');
        const chevrons = e.currentTarget.getElementsByTagName('I');

        for (let chevron of chevrons) {
            chevron.classList.toggle('fa-circle-chevron-down');
            chevron.classList.toggle('fa-circle-chevron-up');
        }
    };

    return (
        <div id="faq">
            <main>
                <h2>FAQ Section</h2>
                <section>
                    <div className="qa-block">
                        <div className="question" onClick={toggleAccordion}>
                            <i className="fa-solid fa-circle-chevron-down"></i><p>Question</p><i className="fa-solid fa-circle-chevron-down"></i>
                        </div>
                        <div className="answer-hidden">
                            <p>Answer</p>
                        </div>
                    </div>
                    <div className="qa-block">
                        <div className="question" onClick={toggleAccordion}>
                            <i className="fa-solid fa-circle-chevron-down"></i><p>Question</p><i className="fa-solid fa-circle-chevron-down"></i>
                        </div>
                        <div className="answer-hidden">
                            <p>Answer</p>
                        </div>
                    </div>
                    <div className="qa-block">
                        <div className="question" onClick={toggleAccordion}>
                            <i className="fa-solid fa-circle-chevron-down"></i><p>Question</p><i className="fa-solid fa-circle-chevron-down"></i>
                        </div>
                        <div className="answer-hidden">
                            <p>Answer</p>
                        </div>
                    </div>
                    <div className="qa-block">
                        <div className="question" onClick={toggleAccordion}>
                            <i className="fa-solid fa-circle-chevron-down"></i><p>Question</p><i className="fa-solid fa-circle-chevron-down"></i>
                        </div>
                        <div className="answer-hidden">
                            <p>Answer</p>
                        </div>
                    </div>
                    <div className="qa-block">
                        <div className="question" onClick={toggleAccordion}>
                            <i className="fa-solid fa-circle-chevron-down"></i><p>Question</p><i className="fa-solid fa-circle-chevron-down"></i>
                        </div>
                        <div className="answer-hidden">
                            <p>Answer</p>
                        </div>
                    </div>
                    <div className="qa-block">
                        <div className="question" onClick={toggleAccordion}>
                            <i className="fa-solid fa-circle-chevron-down"></i><p>Question</p><i className="fa-solid fa-circle-chevron-down"></i>
                        </div>
                        <div className="answer-hidden">
                            <p>Answer</p>
                        </div>
                    </div>
                </section>
                <h3>If you have more questions contact us on <a href="mailto:fake_email@fake.fake"
                    className="contact">fake_email@fake.fake</a></h3>
            </main>
        </div>
    );
};