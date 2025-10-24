/**
 * 处理双斜杠规则（规则1）：将右侧有空白的双斜杠"\\ "转义为"\\\\"
 * 保留场景：\\后紧跟字母（a-zA-Z），构成LaTeX命令（如\\sin、\\alpha），此类不转义。
 * 转义场景：\\后为非字母（如空格、%、&、数字或行尾），此类需转义为\\\\。
 * @param {string} content - 数学公式内容字符串
 * @returns {string} 处理后的字符串
 */
function processRule1(content) {
    let result = [];  // 存储处理结果的字符数组
    let i = 0;
    const n = content.length;
    
    while (i < n) {
        // 遇到斜杠时开始检查
        if (content[i] === '\\') {
            let count = 1;
            // 计算连续斜杠的数量
            while (i + count < n && content[i + count] === '\\') {
                count++;
            }
            
            // 规则：连续2个以上斜杠保持不变
            if (count > 2) {
                result.push(...Array(count).fill('\\'));
                i += count;
            } 
            // 处理双斜杠情况
            else if (count === 2) {
                // 获取双斜杠左侧和右侧的字符
                //const prevChar = i > 0 ? content[i - 1] : null;
                const nextChar = i + count < n ? content[i + count] : null;
                
                // 检查左右是否有空白字符（空格、制表符、换行等）
                //const leftHasWhitespace = prevChar !== null && /\s/.test(prevChar);
                const rightHasWhitespace = nextChar !== null && !(/[a-zA-Z{}*_\(\)\[\]]/.test(nextChar));
                
                // 右有空白则转义为4个斜杠，否则保持2个斜杠
                if (rightHasWhitespace) {
                    result.push('\\', '\\', '\\', '\\');  // 转义为\\\\
                } else {
                    result.push('\\', '\\');  // 保持原状
                }
                i += count;
            } 
            // 单斜杠暂时直接添加（后续由规则2处理）
            else {
                result.push('\\');
                i += 1;
            }
        } 
        // 非斜杠字符直接添加
        else {
            result.push(content[i]);
            i += 1;
        }
    }
    return result.join('');
}

/**
 * 处理单斜杠规则（规则2）：将后面不是下划线_的单斜杠转义为双斜杠
 * @param {string} content - 经规则2处理后的字符串
 * @returns {string} 处理后的字符串
 */
function processRule2(content) {
    let result = [];
    let i = 0;
    const n = content.length;
    
    
    while (i < n) {
        if (content[i] === '\\') {
            // 判断是否为单斜杠（前后都不是斜杠）
            let isSingle = true;
            if (i > 0 && content[i - 1] === '\\') isSingle = false;  // 左侧有斜杠
            if (i < n - 1 && content[i + 1] === '\\') isSingle = false;  // 右侧有斜杠
            
            if (isSingle) {
                // 检查下一个字符是否为下划线
                if (i < n - 1 && (content[i + 1]  === '_')) {
                    result.push('\\');  // 后面是下划线，不转义
                } else if (i < n - 1 && (content[i + 1] === '*')) {
                    result.push('\\');  // 后面是*，不转义
                } else {
                    result.push('\\', '\\');  // 转义为双斜杠
                }
            } else {
                result.push('\\');  // 非单斜杠直接添加
            }
            i += 1;
        } else {
            result.push(content[i]);
            i += 1;
        }
    }
    return result.join('');
}

/**
 * 处理下划线规则（规则3）：将前面没有斜杠_的下划线转义为\_
 * @param {string} content - 经规则1和规则2处理后的字符串
 * @returns {string} 处理后的字符串
 */
function processRule3(content) {
    let result = [];
    let i = 0;
    const n = content.length;
    
    while (i < n) {
        if (content[i] === '_') {
            // 检查前一个字符是否为斜杠（已转义的下划线）
            if (i > 0 && content[i - 1] === '\\') {
                result.push('_');  // 已转义，保持原状
            } else {
                result.push('\\', '_');  // 未转义，添加斜杠
            }
            i += 1;
        } else if (content[i] === '*') {
            // 检查前一个字符是否为*（已转义的*）
            if (i > 0 && content[i - 1] === '\\') {
                result.push('*');  // 已转义，保持原状
            } else {
                result.push('\\', '*');  // 未转义，添加*
            }
            i += 1;
        } else if (content[i] === '[') {
            // 检查前一个字符是否为（已转义的[）
            if (i > 0 && content[i - 1] === '\\') {
                result.push('[');  // 已转义，保持原状
            } else {
                result.push('\\', '[');  // 未转义，添加
            }
            i += 1;
        } else if (content[i] === ']') {
            // 检查前一个字符是否为]（已转义的]）后面加个空格防止解析成md链接
            if (i > 0 && content[i - 1] === '\\') {
                result.push('] ');  // 已转义，保持原状
            } else {
                result.push('\\', '] ');  // 未转义，添加
            }
            i += 1;
        } else if (content[i] === '%') {
            // 检查前一个字符是否为（已转义的）
            if (i > 0 && content[i - 1] === '\\') {
                result.push('%');  // 已转义，保持原状
            } else {
                result.push('\\', '%');  // 未转义，添加
            }
            i += 1;
        } else if (content[i] === '{') {
            // 检查前一个字符是否为{（已转义的）Nunjucks语法冲突 两个连续的{{中间加空格{ {
            if (i > 0 && content[i - 1] === '{') {
                result.push(' { ');  // 加空格
            } else {
                result.push('{');  // 保持原状
            }
            i += 1;
        } else if (content[i] === '}') {
            // 检查前一个字符是否为}（已转义的）Nunjucks语法冲突 两个连续的}}中间加空格} }
            if (i > 0 && content[i - 1] === '}') {
                result.push(' } ');  // 加空格
            } else if (i > 0 && content[i - 1] === '#') { // Nunjucks语法冲突 #}中间加空格# }
                result.push(' } ');  // 加空格
            } else{
                result.push('}');  // 保持原状
            }
            i += 1;
        }else if (content[i] === '#') {
            // 检查前一个字符是否为{（已转义的）Nunjucks语法冲突 {#中间加空格{ #
            if (i > 0 && content[i - 1] === '{') {
                result.push(' # ');  // 加空格
            } else {
                result.push('#');  // 保持原状
            }
            i += 1;
        } else{
            result.push(content[i]);
            i += 1;
        }
    }
    return result.join('');
}

/**
 * 按顺序应用所有规则处理公式内容
 * @param {string} content - 原始公式内容
 * @returns {string} 完全处理后的公式内容
 */
function processFormulaContent(content) {
    let processed = content;
    processed = processRule1(processed);  // 先处理双斜杠规则
    processed = processRule2(processed);  // 再处理单斜杠规则
    processed = processRule3(processed);  // 最后处理下划线规则
    return processed;
}

/**
 * 处理整个字符串中的所有数学公式
 * @param {string} str - 包含数学公式的原始字符串
 * @returns {string} 处理后的完整字符串
 */
function processMathFormulas(str) {
    // 正则匹配公式：$...$或$$...$$格式（使用/s修饰符使.匹配换行符）
    const formulaRegex = /(\$\$?)(.*?)\1/sg;
    
    // 替换匹配到的公式
    return str.replace(formulaRegex, (match, delimiter, content) => {
        const processedContent = processFormulaContent(content);
        return delimiter + processedContent + delimiter;  // 保留原分隔符
    });
}

// 使用示例：
// const originalString = "包含$公式$或$$公式$$的文本";
// const processedString = processMathFormulas(originalString);


module.exports = function(config) {

   return processMathFormulas;

}
