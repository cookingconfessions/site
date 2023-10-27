'use client'
import { useCafeuContext } from "@/context/CafeuContext";
import React from "react";
import Link from 'next/link'

const CouponSection = () => {
  const {cartTotal,cart} = useCafeuContext()
  const mainTotal = cartTotal + 5
  return (
    <section>
      <div className="coupon-cart cmb-7">
        <div className="container">
          <div className="row justify-content-between">
            <div
              className="col-md-6 mb-4"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <div className="coupon-inside">
                <h2>Discount Coupon Codes</h2>
                <p>
                  Enter your coupon code if you have one and get discount up to
                  50% offer you will get discount with free shipping.
                </p>
                <form action="#">
                  <div className="coupon-form">
                    <input
                      type="text"
                      className="form-control coupon-input"
                      placeholder="Input Your Coupon Code"
                    />
                    <button className="custom-btn" type="submit">
                      Apply Coupon
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="col-md-4 mb-4"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <div className="cart-total">
                <h2>Cart Totals</h2>
                <table className="table table-borderless border-top border-bottom">
                  <tbody>
                    <tr>
                      <td>Sub Total:</td>
                      <td className="cart-price">${cartTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Shipping:</td>
                      <td className="cart-price">$5.00</td>
                    </tr>
                  </tbody>
                </table>
                <div className="total-sum">
                  <p>Total:</p>
                  <p className="sum-price">{cart.length === 0 ? '$0.00':`$${mainTotal.toFixed(2)}`}</p>
                </div>
                {cart.length !== 0 && (
                  <div className="submit-cart">
                  <p className="multiple">Checkout with multiple items</p>
                  <div className="subbit-cart-buttons mt-15">
                    <Link 
                    className="custom-btn"
                    href='/checkout'
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouponSection;
