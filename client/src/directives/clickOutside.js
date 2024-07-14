// Usage: v-click-outside="functionName" (functionName is the function that will be called when clicked outside the element)
export default {
    beforeMount: (el, binding) => {
      el.clickOutsideEvent = event => {
        if (!(el == event.target || el.contains(event.target))) {
          binding.value();
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
      document.removeEventListener("click", el.clickOutsideEvent);
    },
};