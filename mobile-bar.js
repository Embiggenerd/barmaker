
(function () {
  customElements.define('mobile-bar', class extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      this.shadow = this.attachShadow({ mode: 'open' });
      this.render()
    }
    
    attributeChangedCallback(name, oldValue, newValue){
        switch (name) {
            case 'bardata':
                this.data = JSON.parse(newValue)
                this.buildBar(this.data)
                break
            case 'score':
                this.score = newValue
                this.render()
        }
    }

    static get observedAttributes() {
        return ['bardata'];
    }

    get bardata() {
        return this.getAttribute('bardata')
    }

    set bardata(data){
        this.setAttribute('bardata', data)
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

                .custom-score-bar.very-bad .score-level {
                color: #D3334F;
                }

                .custom-score-bar.bad .score-level {
                color: #F53758;
                }

                .custom-score-bar.fair .score-level {
                color: #F5A724;
                }

                .custom-score-bar.good .score-level {
                color: #F1C531;
                }

                .custom-score-bar.excellent .score-level {
                color: #27D381;
                }

                .custom-score-bar.best .score-level {
                color: #24956A;
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

                .custom-score-bar.very-bad .cursor {
                background-color: #D3334F;
                }

                .custom-score-bar.bad .cursor {
                background-color: #F53758;
                }

                .custom-score-bar.fair .cursor {
                background-color: #F5A724;
                }

                .custom-score-bar.good .cursor {
                background-color: #F1C531;
                }

                .custom-score-bar.excellent .cursor {
                background-color: #27D381;
                }
                .custom-score-bar.best .cursor {
                background-color: #24956A;
                }

                .custom-score-bar .score-milestones {
                display: flex;
                justify-content: space-between;
                }

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

            </style>

            <div class="left-panel display-block-mobile" data-array-ref="scoreBarParent"><div class="custom-score-bar good" data-array-class-variable="class" data-last-class-variable="good">
                <div class="above">
                    <div class="score-area">
                    <h3 class="score" data-array-variable="score">691</h3>
                    <!--      <div class="score-change down">21</div>-->
                    </div>
                    <div class="score-level" data-array-variable="rating">good</div>
                </div>

                <div class="bar">
                </div>

                <div class="score-milestones">
                    <div class="score-milestone score-min">300</div>
                    <div class="score-milestone score-fair">560</div>
                    <div class="score-milestone score-good">750</div>
                    <div class="score-milestone score-max">850</div>
                </div>

                <div class="brand">Vantage Score 3.0</div>
                </div>
            </div>`
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    buildBar(data){
        const bar = this.shadow.querySelector('div.bar')
        console.log({bar})
        for(let i = 0; i < data.length; i++){
            const segment = document.createElement('div')
            segment.style.backgroundColor = this.data[i].backgroundColor
            console.log({
                'this.data[i].backgroundColor': this.data[i].backgroundColor
            })
            segment.style.width = `${this.data[i].width}%`
            segment.classList.add('level')
            bar.appendChild(segment)
        }
        const cursor = document.createElement('div')
        cursor.classList.add('cursor')
        cursor.style.left = '50%'
        // this.render()
    }

    
  });
})();