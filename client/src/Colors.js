export const cardHeaderColor = "cyan darken-2"
export const headerTextColor = "white"
export const freshWaterColor = "cyan darken-1"
export const saltwaterColor = "teal darken-1"
export const easyColor = "green darken-1"
export const moderateColor = "amber accent-3"
export const hardColor = "deep-orange accent-3"
export const hoverColor = "cyan darken-4"

export function setLevelColor(level){
    switch (level){
        case "Easy" : 
            return easyColor
        case "Moderate":
            return moderateColor
        case "Hard":
            return hardColor
    }
}



