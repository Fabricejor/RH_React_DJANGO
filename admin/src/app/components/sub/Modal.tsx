import React from 'react';

const Modals = (
    // { isOpen, closeModal }
) => {
    // if (!isOpen) return null;

    return (
        <div className="modal open" >
            <div className="modal__content">
                <span className="modal__close" 
                // onClick={closeModal}
                >×</span>
                <div className="login-form">
                    <div className="login-form__logo">
                        <img src="/images/logo1.png" alt="UjuzAi Logo" />
                    </div>
                    <h2 className="login-form__title">Company login</h2>
                    <form>
                        <div className="login-form__field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Email" />
                        </div>
                        <div className="login-form__field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" />
                            <a href="#" className="login-form__forgot">forgot password</a>
                        </div>
                        <button type="submit" className="login-form__button login-form__button--login">Login</button>
                        <button type="button" className="login-form__button login-form__button--google">
                            <img src="/images/logoGoogle.png" alt="Google Logo" />login with Google</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modals;
