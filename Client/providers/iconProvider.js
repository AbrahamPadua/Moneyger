import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Styles from "../styles/Categories.module.scss";

const iconProvider = {
  getIcons: function (setTentativeIcon) {
    return Object.keys(fas).map((icon) => {
      icon = icon
        .replace(/([A-Z])/g, "-$1")
        .slice(3)
        .toLowerCase();

      if (icon === "stopwatch20") icon = "stopwatch-20";

      return (
        <div
          className={Styles.icon}
          key={icon}
          id={icon}
          onClick={(e) => this.selectIcon(e, setTentativeIcon)}
        >
          <FontAwesomeIcon icon={["fas", icon]} />
          {icon.length > 15 ? `${icon.slice(0, 12)}...` : icon}
        </div>
      );
    });
  },
  selectIcon: (e, setTentativeIcon) => {
    const selectedIcons = document.getElementsByClassName(Styles.select);
    for (let icon of selectedIcons) {
      icon.classList.remove(Styles.select);
    }
    setTentativeIcon(e.target.id);
    e.target.classList.add(Styles.select);
  },
  toggleIconSelection: (e) => {
    e.preventDefault();
    const form = document.querySelector("#iconForm");
    form.classList.toggle(Styles.show);
  },
  search: (value) => {
    return Object.keys(fas)
      .map((icon) =>
        icon
          .replace(/([A-Z])/g, "-$1")
          .slice(3)
          .toLowerCase()
      )
      .filter((icon) => {
        let search = new RegExp(value, "ig");
        return search.test(icon);
      });
  },
};

export default iconProvider;
