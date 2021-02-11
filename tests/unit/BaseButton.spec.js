import { BaseButton } from "@/components/Buttons";
import { mount } from "@vue/test-utils";

describe("BaseButton", () => {
  it("BaseButton to be defined", () => {
    expect(BaseButton).toBeDefined();
  });

  it.each(["button", "a", "router-link"])(
    "should return correct tag element by props",
    tag => {
      const buttonWrapper = mount(BaseButton, {
        propsData: { tag },
        stubs: ["router-link"]
      });
      expect(buttonWrapper.find(tag)).toBeTruthy();
    }
  );

  it("should not pass validation", () => {
    expect(BaseButton.props.tag.validator("div")).toBeFalsy();
  });

  it("should has button_block class", async () => {
    const buttonWrapper = mount(BaseButton);
    expect(buttonWrapper.classes("button_block")).toBeFalsy();
    await buttonWrapper.setProps({
      block: true
    });
    expect(buttonWrapper.classes("button_block")).toBeTruthy();
  });

  it("should has div slot", () => {
    const buttonWrapper = mount(BaseButton, {
      slots: {
        default: "div"
      }
    });
    expect(buttonWrapper.find("div")).toBeTruthy();
  });

  it("should has handle events", () => {
    const handle = jest.fn();
    const buttonWrapper = mount(BaseButton, {
      listeners: {
        click: e => handle(e)
      }
    });
    buttonWrapper.trigger("click");
    expect(handle).toHaveBeenCalled();
    expect(handle).toHaveBeenCalledTimes(1);
  });
});
