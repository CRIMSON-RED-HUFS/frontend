import { MENU_ITEMS } from "../../constants/menu";
import { MenuItem } from "./MenuItem";

export function MenuList({ activeIndex, items = MENU_ITEMS, reduceMotion, onActivate, onClose, onHoverSound }) {
  return (
    <div className="menu-stack" role="list">
      {items.map((item, index) => (
        <MenuItem
          key={item.label}
          index={index}
          item={item}
          isActive={index === activeIndex}
          reduceMotion={reduceMotion}
          onActivate={onActivate}
          onClose={onClose}
          onHoverSound={onHoverSound}
        />
      ))}
    </div>
  );
}
