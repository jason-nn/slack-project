export const icons = [
    "Images/Icon_1.png",
    "Images/Icon_2.png",
    "Images/Icon_3.png",
];

export const avatars = [
    "Images/Avatar_1.png",
    "Images/Avatar_2.png",
    "Images/Avatar_3.png",
    "Images/Avatar_4.png",
    "Images/Avatar_5.png",
    "Images/Avatar_6.png",
    "Images/Avatar_7.png",
    "Images/Avatar_8.png",
];

export function calculateIndex(ID, type) {
    let dividend;
    if (type === "Channel") dividend = 3;
    if (type === "User") dividend = 8;
    return ID % dividend;
}
