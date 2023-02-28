def get_cold(ta, wind):
    cold = [] # 한파 배열
    for i in range(len(ta)):
        vkm = wind[i] * 3.6
        calculator = 13.12 + 0.6215 * ta[i] - 11.37 * wind[i] ** 0.16 + 0.3965 * vkm ** 0.16 * ta[i]
        if calculator >= -3.2:
            cold.append("안전")
        elif calculator < -3.2 and calculator >= -10.4:
            cold.append("경고")
        elif calculator < -10.5 and calculator >= -15.4:
            cold.append("주의")
        elif calculator <= -15.5:
            cold.append("위험")
    return cold

print(get_cold([-1],[80]))