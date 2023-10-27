import React, { useState } from 'react';
import MenuTabPane from './MenuTabPane';



const MenuBookSection: React.FC = () => {
    type TabState = {
        [key: string]: boolean;
        tab1: boolean;
        tab2: boolean;
        tab3: boolean;
        tab4: boolean;
        tab5: boolean;
      };
      
    const [isTabOpen, setIsTabOpen] = useState<TabState>({
        tab1: true,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
      });
      
      const handleTabToggle = (tabToToggle: string) => {
        setIsTabOpen((prevState) => {
          const newState: TabState = { ...prevState };
      
          // Close all tabs
          for (const key in newState) {
            newState[key] = false;
          }
      
          // Open the selected tab
          newState[tabToToggle] = true;
      
          return newState;
        });
      };
  

  return (
    <section className="menu-book tabs position-re dark-mode pb-90" data-scroll-index="1">
      <div className="container">
        <div className="row">
          <div className="col-12" data-aos="fade-up" data-aos-duration="1000">
            <div className="cb-section-title text-center mb-40">
              <p className="cb-section-icon mb-0"><span className="cb-section-icon-inner"><i className="icofont-beans"></i></span></p>
              <span className="cb-section-subtitle">Dishes</span>
              <h2 className="cb-section-title">Popular Dishes</h2>
              <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />incididunt ut labore et dolore magna aliqua. Quis ipsum susp</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center" data-aos="fade-up" data-aos-duration="1500">
          <div className="col-md-12">
            <div className="tab-links mb-45">
              <ul className="text-center">
                <li className={`item-link ${isTabOpen.tab1 ? 'current' : ''}`} data-tab="tab-1" onClick={() => handleTabToggle('tab1')}> Starters </li>
                <li className={`item-link ${isTabOpen.tab2 ? 'current' : ''}`} data-tab="tab-2" onClick={() => handleTabToggle('tab2')}> Mains </li>
                <li className={`item-link ${isTabOpen.tab3 ? 'current' : ''}`} data-tab="tab-3" onClick={() => handleTabToggle('tab3')}> Salads </li>
                <li className={`item-link ${isTabOpen.tab4 ? 'current' : ''}`} data-tab="tab-4" onClick={() => handleTabToggle('tab4')}> Desserts </li>
                <li className={`item-link ${isTabOpen.tab5 ? 'current' : ''}`} data-tab="tab-5" onClick={() => handleTabToggle('tab5')}> Wine </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12" data-aos="fade-up" data-aos-duration="2000">
            <div className="position-re">
              <div className={`tab-content ${isTabOpen.tab1 ? 'current' : ''}`} id="tab-1">
                <MenuTabPane
                  firstStartIndex={0}
                  firstEndIndex={4}
                  secondStartIndex={4}
                  secondEndIndex={8}
                />
              </div>
              <div className={`tab-content ${isTabOpen.tab2 ? 'current' : ''}`} id="tab-2">
                <MenuTabPane
                  firstStartIndex={8}
                  firstEndIndex={12}
                  secondStartIndex={12}
                  secondEndIndex={16}
                />
              </div>
              <div className={`tab-content ${isTabOpen.tab3 ? 'current' : ''}`} id="tab-3">
                <MenuTabPane
                  firstStartIndex={0}
                  firstEndIndex={4}
                  secondEndIndex={-4}
                />
              </div>
              <div className={`tab-content ${isTabOpen.tab4 ? 'current' : ''}`} id="tab-4">
                <MenuTabPane
                  firstStartIndex={4}
                  firstEndIndex={8}
                  secondStartIndex={8}
                  secondEndIndex={12}
                />
              </div>
              <div className={`tab-content ${isTabOpen.tab5 ? 'current' : ''}`} id="tab-5">
                <MenuTabPane
                  firstStartIndex={12}
                  firstEndIndex={16}
                  secondEndIndex={-4}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuBookSection;
