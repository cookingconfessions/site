import {productList } from "@/data/Data";
import Link from "next/link";
import React from "react";

interface MenuTabProp {
  firstStartIndex: number;
  firstEndIndex: number;
  secondStartIndex?: number;
  secondEndIndex: number;
}
const MenuTabPane: React.FC<MenuTabProp> = ({
  firstStartIndex,
  firstEndIndex,
  secondStartIndex,
  secondEndIndex,
}) => {
  return (
    <div className="row">
      <div className="col-md-6 menu-book-column">
            {productList.slice(firstStartIndex, firstEndIndex).map((item) => (
              <div className="menu-list" key={item.id}>
                <div className="item">
                  <div className="img">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="image-popup-vertical-fit"
                      title="Mozzarella Dippers"
                    >
                      <img src={item.imgSrc} alt={item.name} />{" "}
                    </Link>
                  </div>
                  <div className="item-content">
                    <div className="flex">
                      <div className="title">
                        <Link 
                        href={`/shop/${item.slug}`}
                        >
                         {item.name} 
                        </Link>
                      </div>
                      <div className="dots"></div>
                      <div className="price">{item.price}</div>
                    </div>
                    <p>
                      <i>{item.desc}</i>
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className="col-md-6 menu-book-column">
        {secondStartIndex !== undefined && secondEndIndex !== undefined
          ? productList.slice(secondStartIndex, secondEndIndex).map((item) => (
              <div className="menu-list" key={item.id}>
                <div className="item">
                  <div className="img">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="image-popup-vertical-fit"
                      title="Mozzarella Dippers"
                    >
                      <img src={item.imgSrc} alt={item.name} />{" "}
                    </Link>
                  </div>
                  <div className="item-content">
                    <div className="flex">
                      <div className="title">
                        <Link 
                        href={`/shop/${item.slug}`}
                        >
                         {item.name} 
                        </Link>
                      </div>
                      <div className="dots"></div>
                      <div className="price">{item.price}</div>
                    </div>
                    <p>
                      <i>{item.desc}</i>
                    </p>
                  </div>
                </div>
              </div>
            ))
          : productList.slice(secondEndIndex).map((item) => (
              <div className="menu-list" key={item.id}>
                <div className="item">
                  <div className="img">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="image-popup-vertical-fit"                    >
                      <img src={item.imgSrc} alt={item.name} />{" "}
                    </Link>
                  </div>
                  <div className="item-content">
                    <div className="flex">
                      <div className="title">
                        <Link 
                        href={`/shop/${item.slug}`}
                        >
                         {item.name} 
                        </Link>
                      </div>
                      <div className="dots"></div>
                      <div className="price">{item.price}</div>
                    </div>
                    <p>
                      <i>{item.desc}</i>
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MenuTabPane;
