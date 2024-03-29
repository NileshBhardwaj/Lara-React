<div class="wrapper" id="app">
    <div class="card-form">
        
        <div class="card-form__inner">
            <div class="card-input">
                <label for="cardNumber" class="card-input__label">Card Number</label>
                <input type="text" id="cardNumber" class="card-input__input" v-mask="generateCardNumberMask"
                    v-model="cardNumber" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardNumber"
                    autocomplete="off">
            </div>
            <div class="card-input">
                <label for="cardName" class="card-input__label">Card Holders</label>
                <input type="text" id="cardName" class="card-input__input" v-model="cardName" v-on:focus="focusInput"
                    v-on:blur="blurInput" data-ref="cardName" autocomplete="off">
            </div>
            <div class="card-form__row">
                <div class="card-form__col">
                    <div class="card-form__group">
                        <label for="cardMonth" class="card-input__label">Expiration Date</label>
                        <select class="card-input__input -select" id="cardMonth" v-model="cardMonth"
                            v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardDate">
                            <option value="" disabled selected>Month</option>
                            <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12"
                                v-bind:disabled="n < minCardMonth" v-bind:key="n">
                                {{ n < 10 ? '0' + n : n }}
                            </option>
                        </select>
                        <select class="card-input__input -select" id="cardYear" v-model="cardYear"
                            v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardDate">
                            <option value="" disabled selected>Year</option>
                            <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">
                                {{ $index + minCardYear }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="card-form__col -cvv">
                    <div class="card-input">
                        <label for="cardCvv" class="card-input__label">CVV</label>
                        <input type="text" class="card-input__input" id="cardCvv" v-mask="'####'" maxlength="4"
                            v-model="cardCvv" v-on:focus="flipCard(true)" v-on:blur="flipCard(false)"
                            autocomplete="off">
                    </div>
                </div>
            </div>

            <button class="card-form__button">
                Submit
            </button>
        </div>
    </div>

    <a href="https://github.com/muhammederdem/credit-card-form" target="_blank" class="github-btn">
        See on GitHub
    </a>
</div>