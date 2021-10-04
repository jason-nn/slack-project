import Avatar_1 from "../Images/Avatar_1.png";
import Avatar_2 from "../Images/Avatar_2.png";
import Avatar_3 from "../Images/Avatar_3.png";
import Avatar_4 from "../Images/Avatar_4.png";
import Avatar_5 from "../Images/Avatar_5.png";
import Avatar_6 from "../Images/Avatar_6.png";
import Avatar_7 from "../Images/Avatar_7.png";
import Avatar_8 from "../Images/Avatar_8.png";
import Icon_1 from "../Images/Icon_1.png";
import Icon_2 from "../Images/Icon_2.png";
import Icon_3 from "../Images/Icon_3.png";

export const icons = [Icon_1, Icon_2, Icon_3];

export const avatars = [
    Avatar_1,
    Avatar_2,
    Avatar_3,
    Avatar_4,
    Avatar_5,
    Avatar_6,
    Avatar_7,
    Avatar_8,
];

export function generateImage(ID, type) {
    if (type === "Channel") {
        return icons[ID % 3];
    }
    if (type === "User") {
        return avatars[ID % 8];
    }
}
