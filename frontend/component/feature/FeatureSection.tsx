'use client'
import { serviceList } from '@/data/Data'
import React from 'react'

const FeatureSection = () => {
  return (
    <div className="feature cpy-8">
        <div className="container">
            <div className="row justify-content-center">
                {serviceList.slice(-4).map((item) => (
                 <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 mb-4" key={item.id}>
                    <div className="feature-card" data-aos="fade-up" data-aos-duration="1000">
                        <div className="feature-icon-sec">
                            <div className="feature-box">
                                <img src={item.imgSrc} alt={item.title}/>
                            </div>
                        </div>
                        <div className="feature-details">
                            <h3 className="feature-name"><a href={`/service/${item.slug}`}>{item.title}</a></h3>
                            <p className="feature-des">{item.desc}</p>
                            <a href={`/service/${item.slug}`} className="discover-bt">Discover More</a>
                        </div>
                    </div>
                </div>   
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default FeatureSection