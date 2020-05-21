from debug_utils import LOG_CURRENT_EXCEPTION


def init(*_, **__):
    try:
        from mod_wn8master import start
        start()
    except Exception:
        LOG_CURRENT_EXCEPTION()


def fini(*_, **__):
    try:
        from mod_wn8master import stop
        stop()
    except Exception:
        LOG_CURRENT_EXCEPTION()
