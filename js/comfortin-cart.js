(() => {
  const offsetFirst = "-55vh";
  const offsetNext = "-61vh";
  const scale = "0.7";

  const apply = () => {
    const frames = document.querySelectorAll('iframe[title="chat widget"]');
    if (!frames.length) return;

    frames.forEach((frame, index) => {
      const offset = index === 0 ? offsetFirst : offsetNext;
      frame.style.setProperty(
        "transform",
        `translateY(${offset}) scale(${scale})`,
        "important",
      );
      frame.style.setProperty("transform-origin", "bottom right", "important");
      frame.style.setProperty("right", "10px", "important");
      frame.style.setProperty("left", "auto", "important");
      frame.style.setProperty("bottom", "0px", "important");
      frame.style.setProperty("top", "auto", "important");
    });
  };

  const init = () => {
    apply();
    setTimeout(apply, 500);
    setTimeout(apply, 1500);
    setTimeout(apply, 3000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("resize", apply);
})();

(() => {
  const tooltipHtml = `
    <span class="comfortin-tooltip" data-comfortin-tooltip>
      <button type="button" class="comfortin-tooltip__trigger" aria-expanded="false">
        Delivery Policy
      </button>
      <div class="comfortin-tooltip__content" role="tooltip" aria-hidden="true">
        <div class="comfortin-tooltip__inner">
          <p>Once you have placed your order online, you will receive an email confirmation from us that includes all of your order details. We aim to dispatch all orders within two business days using Australia Post. If there are any issues with your order or shipment, we will notify you via email. You can also monitor the status of your order at any time by logging into our website. Please note, in certain cases we may choose to use a different shipping carrier. Tracking numbers are available upon request, but are typically emailed to you once your order has been shipped. Should you have any queries, please do not hesitate to contact us using the details provided on our contact page. </p>
          <p>Packages dispatched from Comfort-in may be subject to customs fees and import duties in the destination country. International buyers should be aware that import duties, taxes, and charges are not included in the item price or postage cost. These additional charges are the responsibility of the buyer. We recommend checking with your country’s customs office to determine any potential additional costs before making a purchase.</p>
          <p>For further information about customs requirements, please refer to the following websites: U.S. Customs and Border Protection (cbp.gov), Canada Border Services Agency, and UK Tax and Customs for goods.</p>
        </div>
      </div>
    </span>
  `;

  const attachTooltip = () => {
    const links = document.querySelectorAll(
      ".woocommerce-info a[href*='delivery-policy']",
    );
    if (!links.length) return;

    links.forEach((link) => {
      if (link.closest(".comfortin-tooltip")) return;

      const wrapper = document.createElement("span");
      wrapper.innerHTML = tooltipHtml.trim();
      const tooltip = wrapper.firstElementChild;
      link.replaceWith(tooltip);

      if (tooltip.dataset.bound === "1") return;
      tooltip.dataset.bound = "1";

      const trigger = tooltip.querySelector(".comfortin-tooltip__trigger");
      const content = tooltip.querySelector(".comfortin-tooltip__content");

      const positionTooltip = () => {
        content.style.removeProperty("--comfortin-tooltip-shift");

        const padding = 12;
        const rect = content.getBoundingClientRect();
        let shift = 0;

        if (rect.left < padding) {
          shift = padding - rect.left;
        } else if (rect.right > window.innerWidth - padding) {
          shift = (window.innerWidth - padding) - rect.right;
        }

        if (shift !== 0) {
          content.style.setProperty("--comfortin-tooltip-shift", `${shift}px`);
        }
      };

      const closeTooltip = () => {
        tooltip.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        content.setAttribute("aria-hidden", "true");
        content.style.removeProperty("--comfortin-tooltip-shift");
      };

      const openTooltip = () => {
        tooltip.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        content.setAttribute("aria-hidden", "false");
        requestAnimationFrame(positionTooltip);
      };

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        if (tooltip.classList.contains("is-open")) {
          closeTooltip();
        } else {
          openTooltip();
        }
      });

      document.addEventListener("click", (event) => {
        if (!tooltip.contains(event.target)) {
          closeTooltip();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeTooltip();
        }
      });
    });
  };

  const initTooltip = () => {
    attachTooltip();

    const root = document.querySelector(".woocommerce") || document.body;
    const observer = new MutationObserver(() => {
      attachTooltip();
    });
    observer.observe(root, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTooltip);
  } else {
    initTooltip();
  }
})();
