import React, { useState } from "react";
import InfiniteSlider from "react-infinite-slider";
import "../node_modules/react-infinite-slider/dist/index.css";
import "./App.css";

function App() {
  // Sample data for room categories
  const roomCategories = [
    {
      id: 1,
      name: "Lorem Ipsum 1",
      image: "https://picsum.photos/200/150?random=1",
    },
    {
      id: 2,
      name: "Lorem Ipsum 2",
      image: "https://picsum.photos/200/150?random=2",
    },
    {
      id: 3,
      name: "Lorem Ipsum 3",
      image: "https://picsum.photos/200/150?random=3",
    },
    {
      id: 4,
      name: "Lorem Ipsum 4",
      image: "https://picsum.photos/200/150?random=4",
    },
    {
      id: 5,
      name: "Lorem Ipsum 5",
      image: "https://picsum.photos/200/150?random=5",
    },
    {
      id: 6,
      name: "Lorem Ipsum 6",
      image: "https://picsum.photos/200/150?random=6",
    },
    {
      id: 7,
      name: "Lorem Ipsum 7",
      image: "https://picsum.photos/200/150?random=7",
    },
    {
      id: 8,
      name: "Lorem Ipsum 8",
      image: "https://picsum.photos/200/150?random=8",
    },
    {
      id: 9,
      name: "Lorem Ipsum 9",
      image: "https://picsum.photos/200/150?random=9",
    },
    {
      id: 10,
      name: "Lorem Ipsum 10",
      image: "https://picsum.photos/200/150?random=10",
    },
  ];

  // Options for the slider
  const [options, setOptions] = useState({
    slideWidth: 200,
    slideHeight: 150,
    slidesToScroll: 1,
    gap: 16,
    showScrollbar: true,
    autoPlay: false,
    autoPlaySpeed: 3000,
    loop: true,
  });

  // Toggle options
  const toggleOption = (option) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };

  // Update number options
  const updateNumberOption = (option, value) => {
    setOptions({
      ...options,
      [option]: Number(value),
    });
  };

  return (
    <div className="app">
      <header>
        <h1>InfiniteSlider Demo</h1>
        <p>A showcase of the InfiniteSlider component's capabilities</p>
      </header>

      <main>
        <section className="slider-container">
          {/* InfiniteSlider component */}
          <InfiniteSlider
            slideWidth={options.slideWidth}
            slideHeight={options.slideHeight}
            slidesToScroll={options.slidesToScroll}
            gap={options.gap}
            showScrollbar={options.showScrollbar}
            autoPlay={options.autoPlay}
            autoPlaySpeed={options.autoPlaySpeed}
            loop={options.loop}
          >
            {roomCategories.map((category) => (
              <div key={category.id} className="slide-item">
                <img
                  className="slide-image"
                  src={category.image}
                  alt={category.name}
                />
                <div className="slide-label">{category.name}</div>
              </div>
            ))}
          </InfiniteSlider>
        </section>

        <section className="options-panel">
          <h2>Slider Options</h2>

          <div className="option-group">
            <label>
              <span>Slide Width:</span>
              <input
                type="number"
                value={options.slideWidth}
                onChange={(e) =>
                  updateNumberOption("slideWidth", e.target.value)
                }
                min="100"
                max="400"
              />
            </label>
          </div>

          <div className="option-group">
            <label>
              <span>Slide Height:</span>
              <input
                type="number"
                value={options.slideHeight}
                onChange={(e) =>
                  updateNumberOption("slideHeight", e.target.value)
                }
                min="100"
                max="400"
              />
            </label>
          </div>

          <div className="option-group">
            <label>
              <span>Slides to Scroll:</span>
              <input
                type="number"
                value={options.slidesToScroll}
                onChange={(e) =>
                  updateNumberOption("slidesToScroll", e.target.value)
                }
                min="1"
                max="5"
              />
            </label>
          </div>

          <div className="option-group">
            <label>
              <span>Gap between slides:</span>
              <input
                type="number"
                value={options.gap}
                onChange={(e) => updateNumberOption("gap", e.target.value)}
                min="0"
                max="50"
              />
            </label>
          </div>

          <div className="option-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={options.showScrollbar}
                onChange={() => toggleOption("showScrollbar")}
              />
              <span>Show Scrollbar</span>
            </label>
          </div>

          <div className="option-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={options.loop}
                onChange={() => toggleOption("loop")}
              />
              <span>Looping</span>
            </label>
          </div>

          <div className="option-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={options.autoPlay}
                onChange={() => toggleOption("autoPlay")}
              />
              <span>Auto Play</span>
            </label>
          </div>

          <div className="option-group">
            <label>
              <span>Auto Play Speed (ms):</span>
              <input
                type="number"
                value={options.autoPlaySpeed}
                onChange={(e) =>
                  updateNumberOption("autoPlaySpeed", e.target.value)
                }
                min="1000"
                max="10000"
                step="500"
                disabled={!options.autoPlay}
              />
            </label>
          </div>

          <div className="option-group">
            <label>
              <span>RTL Mode:</span>
              <select
                onChange={(e) => {
                  document.documentElement.dir = e.target.value;
                }}
              >
                <option value="ltr">Left to Right (LTR)</option>
                <option value="rtl">Right to Left (RTL)</option>
              </select>
            </label>
          </div>
        </section>
      </main>

      <footer>
        <p>InfiniteSlider Component Demo - A lightweight carousel for React</p>
      </footer>
    </div>
  );
}

export default App;
