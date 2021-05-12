interface LabeledValue {
  label: string
}

function printLabel(labeledObj: LabeledValue): void {
  console.log(labeledObj.label)
}

let labelObj: LabeledValue = {
  label: 'aa'
}

printLabel(labelObj)