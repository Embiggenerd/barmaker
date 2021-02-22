
(function () {
  customElements.define('mobile-bar', class extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      this.shadow = this.attachShadow({ mode: 'open' });
    this.bar = []
      this.render()
    }
    
    attributeChangedCallback(name, oldValue, newValue){
        switch (name) {
            case 'bardata':
                this.bar = JSON.parse(newValue)
                this.clearBar()
                this.buildBar()
                break
            case 'score':
                console.log('screochanged', newValue)

                this.showScore()
        }
    }

    static get observedAttributes() {
        return ['bardata', 'score'];
    }

    get bardata() {
        return this.getAttribute('bardata')
    }

    set bardata(data){
        this.setAttribute('bardata', data)
    }

    get score() {        
        return this.getAttribute('score')
    }

    set score(score){
        this.setAttribute('score', score)
        console.log('screoset*******************************************', score)
        // this.score = newValue
        // this.showScore()
    }
 
    render(){
        let template = document.createElement('template');
        template.innerHTML = `
            <style>
            .custom-score-bar {
                width: 100%;
                flex: 1;
                min-width: 250px;
                }

                .custom-score-bar .above {
                display: flex;
                justify-content: space-between;
                }

                .custom-score-bar .score-area {
                display: flex;
                }

                .custom-score-bar .score-change {
                position: relative;
                color: #000;
                font-size: 13px;
                font-weight: 500;
                margin: 16px 0 0 5px;
                }

                .custom-score-bar .score {
                margin-bottom: 15px;
                font-size: 40px;
                color: #3E3F42;
                line-height: 1;
                }

                .custom-score-bar .score-change:before {
                position: absolute;
                display: inline-block;
                content: " ";
                top: -12px;
                left: calc(50% - 6px);
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 9px 6px 0 6px;
                }

                .custom-score-bar .score-change.down:before {
                border-color: #F53758 transparent transparent transparent;
                }

                .custom-score-bar .score-change.up:before {
                border-color: #27D381 transparent transparent transparent;
                transform: rotate(180deg);
                }

                .custom-score-bar .score-level {
                padding-top: 4px;
                font-size: 21px;
                font-weight: 700;
                text-align: right;
                text-transform: uppercase;
                }

                .custom-score-bar .bar {
                position: relative;
                height: 12px;
                border-radius: 3px;
                display: flex;
                }

                .custom-score-bar .level.very-bad {
                width: 16%;
                border-radius: 3px 0 0 3px;
                background-color: #D3334F;
                }

                .custom-score-bar .level.bad {
                width: 21.5%;
                background-color: #F53758;
                }

                .custom-score-bar .level.fair {
                width: 9%;
                background-color: #F5A724;
                }

                .custom-score-bar .level.good {
                width: 26%;
                background-color: #F1C531;
                }

                .custom-score-bar .level.excellent {
                width: 21.5%;
                background-color: #27D381;
                }

                .custom-score-bar .level.best {
                width: 6%;
                border-radius: 0 3px 3px 0;
                background-color: #24956A;
                }

                .custom-score-bar .cursor {
                position: absolute;
                top: -5px;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
                border: 4px solid #FFFFFF;
                background-color: transparent;
                left: 56%;
                transition: left 0.2s ease-in-out;
                transform: translateX(-50%);
                }

                // .custom-score-bar .score-milestones {
                // display: flex;
                // justify-content: space-between;
                // }

                .custom-score-bar .score-milestone {
                margin-top: 6px;
                color: #6B6C6F;
                font-size: 12px;
                }

                .custom-score-bar .score-fair {
                flex: 0 0 25%;
                text-align: center;
                }

                .custom-score-bar .brand {
                margin-top: 5px;
                color: #6B6C6F;
                font-size: 14px;
                }

                .bar {
                    position:relative;
                }

                .milestone {
                    color: #6B6C6F;
                    font-size: 12px;
                    position:absolute;
                }

            </style>

            <div class="left-panel display-block-mobile" data-array-ref="scoreBarParent"><div class="custom-score-bar good" data-array-class-variable="class" data-last-class-variable="good">
                <div class="above">
                    <div class="score-area">
                    <h3 class="score" data-array-variable="score">${this.score}</h3>
                    <!--      <div class="score-change down">21</div>-->
                    </div>
                    <div class="score-level" data-array-variable="rating">good</div>
                </div>

                <div class="bar">
                </div>

                <div class="brand">Vantage Score 3.0</div>
                </div>
            </div>`
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    buildBar(){
        const bar = this.shadow.querySelector('div.bar')
        console.log({bar})
        for(let i = 0; i < this.bar.length; i++){
            const segment = document.createElement('div')
            segment.style.backgroundColor = this.bar[i].backgroundColor
            console.log({
                'this.bar[i].backgroundColor': this.bar[i].backgroundColor
            })
            segment.style.width = `${this.bar[i].width}%`
            segment.classList.add('level')
            bar.appendChild(segment)
        }
        const cursorFound = this.shadow.querySelector('div.cursor')
    
        console.log({cursorFound})
        if(cursorFound){
            cursorFound.remove()
        }
        const cursor = document.createElement('div')
        cursor.classList.add('cursor')
        cursor.backgroundColor = 'transparent'
        cursor.style.left = `${this.getCursorPercent()}%`
        bar.appendChild(cursor)
    }

    clearBar(){
        const segments = this.shadow.querySelectorAll('div.level')
        segments.forEach(s => s.remove())
    }

    showScore(){
        const scoreText = this.shadow.querySelector('[data-array-variable="score"]')
        const cursor = this.shadow.querySelector('div.cursor')
        scoreText.innerText = this.score
        cursor.style.left = `${this.getCursorPercent()}%`
        const scoreLevel = this.shadow.querySelector('.score-level')
        const {level, color} = this.getScoreLevel()
        scoreLevel.innerText = level
        scoreLevel.style.color=color
        console.log({level, color})
    }

    getCursorPercent(){
        let totalPercent = 0
        const floatScore = parseFloat(this.score)
        for(let i = 0; i < this.bar.length; i++){
            if(floatScore >= this.bar[i].valueBegin && floatScore <= this.bar[i].valueEnd){
                const segmentPercent = floatScore - this.bar[i].valueBegin
                const lala = segmentPercent / (this.bar[i].valueEnd - this.bar[i].valueBegin)
                console.log({lala, segmentPercent, floatScore, totalPercent})
                totalPercent+= (lala * 100) * (this.bar[i].width/100)
                break
            }
            totalPercent+= this.bar[i].width
        }
        return totalPercent
    }

    getScoreLevel(){
        const scoreLevel = {
            level:"",
            color:""
        }
        const floatScore = parseFloat(this.score)
        for(let i = 0; i < this.bar.length; i++){
            if(floatScore >= this.bar[i].valueBegin && floatScore <= this.bar[i].valueEnd){
                scoreLevel.level = this.bar[i].innerText
                scoreLevel.color = this.bar[i].backgroundColor

                break
            }
        }
        return scoreLevel
    }

    makeMilestones(){
        const mileStones = this.shadow.querySelectorAll('.milestone')
        mileStones.forEach(m => m.remove())
        const bar = this.shadow.querySelector('div.bar')
        for(let i = 0; i < this.bar.length; i++){
            if(floatScore >= this.bar[i].valueBegin && floatScore <= this.bar[i].valueEnd){
                scoreLevel.level = this.bar[i].innerText
                scoreLevel.color = this.bar[i].backgroundColor
                break
            }
        }
    }
    
  });
})();