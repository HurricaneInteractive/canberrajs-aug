const getCategoryColour = (id: number): string => {
  const colours: string[] = ["gray", "red", "orange", "green", "teal", "blue", "indigo", "purple", "pink"]

  return colours[id] || "gray"
}

export default getCategoryColour
